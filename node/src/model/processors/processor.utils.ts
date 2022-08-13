import { DateTime, LocalZone, Zone} from "luxon";

/**
 * Replaces the ' ' in dates with 'T'
 */
export function isofy(date: string): string{
    return date.replace(' ', 'T');
}

/**
 * Round the source DateTime into the target milliseconds and return DateTime
 */
export function roundedDateToInterval(source: DateTime, intervalMs: number, zone: Zone = LocalZone.instance): DateTime{
    const roundedMs = intervalMs * Math.floor(source.toMillis() / intervalMs);
    return DateTime.fromMillis(roundedMs, { zone: zone });
}