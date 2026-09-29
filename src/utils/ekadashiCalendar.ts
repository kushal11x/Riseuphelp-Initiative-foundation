import type { SevaScheduleEvent } from '../types';

/**
 * Parses diverse date formats into local timestamp (midnight).
 * e.g. "Oct 6, 2026", "Sep 22, 2026", "2026-10-06", "November 12, 2026"
 */
export function parseEventDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const cleaned = dateStr.trim();
  const parsed = new Date(cleaned);
  if (isNaN(parsed.getTime())) return null;
  // normalize to local midnight
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function getTodayMidnight(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function getDaysUntil(dateStr: string): number {
  const targetDate = parseEventDate(dateStr);
  if (!targetDate) return 0;
  const today = getTodayMidnight();
  const diffMs = targetDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export interface ProcessedScheduleResult {
  processedEvents: SevaScheduleEvent[];
  primaryEvent: SevaScheduleEvent;
  isTodayActive: boolean;
  daysUntilNext: number;
  upcomingEvents: SevaScheduleEvent[];
  completedEvents: SevaScheduleEvent[];
}

/**
 * Fully automatic Ekadashi calendar lifecycle engine:
 * 1. Checks current calendar date against each event's scheduled date.
 * 2. If event date is strictly in the past (before today) and was active_today,
 *    automatically rolls it over into 'completed'.
 * 3. If event date is TODAY, automatically promotes it to 'active_today'.
 * 4. If event date is in the future, marks it as 'upcoming'.
 * 5. Automatically identifies the closest upcoming Ekadashi and brings it to the top!
 */
export function processEkadashiSchedule(events: SevaScheduleEvent[]): ProcessedScheduleResult {
  if (!Array.isArray(events) || events.length === 0) {
    return {
      processedEvents: [],
      primaryEvent: {} as SevaScheduleEvent,
      isTodayActive: false,
      daysUntilNext: 0,
      upcomingEvents: [],
      completedEvents: [],
    };
  }

  const today = getTodayMidnight();
  const todayTime = today.getTime();

  // Step 1: Update status based on actual calendar date
  const processed = events.map((event) => {
    const eventDate = parseEventDate(event.date);
    if (!eventDate) return event;

    const eventTime = eventDate.getTime();

    // Event is in the past
    if (eventTime < todayTime) {
      if (event.status === 'active_today') {
        return {
          ...event,
          status: 'completed' as const,
          sponsoredCoconuts: Math.max(event.sponsoredCoconuts, event.targetCoconuts),
        };
      }
      return event;
    }

    // Event is TODAY
    if (eventTime === todayTime) {
      return {
        ...event,
        status: 'active_today' as const,
      };
    }

    // Event is in the FUTURE
    if (eventTime > todayTime) {
      if (event.status === 'active_today') {
        return {
          ...event,
          status: 'upcoming' as const,
        };
      }
      return event;
    }

    return event;
  });

  // Step 2: Categorize and sort
  const activeToday = processed.find((e) => e.status === 'active_today');

  const upcomingEvents = processed
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => {
      const da = parseEventDate(a.date)?.getTime() || 0;
      const db = parseEventDate(b.date)?.getTime() || 0;
      return da - db;
    });

  const completedEvents = processed
    .filter((e) => e.status === 'completed')
    .sort((a, b) => {
      const da = parseEventDate(a.date)?.getTime() || 0;
      const db = parseEventDate(b.date)?.getTime() || 0;
      return db - da; // most recent first
    });

  // Primary event is either today's active event or the closest upcoming Ekadashi
  const isTodayActive = !!activeToday;
  const primaryEvent = activeToday || upcomingEvents[0] || completedEvents[0] || processed[0];

  let daysUntilNext = 0;
  if (!isTodayActive && primaryEvent) {
    const pDate = parseEventDate(primaryEvent.date);
    if (pDate) {
      const diffMs = pDate.getTime() - todayTime;
      daysUntilNext = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }
  }

  // Ordered list: active event -> upcoming events in chronological order -> completed events
  const orderedList: SevaScheduleEvent[] = [
    ...(activeToday ? [activeToday] : []),
    ...upcomingEvents,
    ...completedEvents,
  ];

  // Preserve any remaining items if any
  const knownIds = new Set(orderedList.map((e) => e.id));
  const remaining = processed.filter((e) => !knownIds.has(e.id));
  const finalEvents = [...orderedList, ...remaining];

  return {
    processedEvents: finalEvents,
    primaryEvent,
    isTodayActive,
    daysUntilNext,
    upcomingEvents,
    completedEvents,
  };
}
