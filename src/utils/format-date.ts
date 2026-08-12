import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

const DEFAULT_LOCALE = id;
const DEFAULT_DATE_FORMAT = 'dd MMMM yyyy';
const DEFAULT_DATETIME_FORMAT = 'dd MMMM yyyy, HH:mm';

export function formatDate(date: string | Date, formatStr?: string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return '-';
  }

  return format(dateObj, formatStr ?? DEFAULT_DATE_FORMAT, {
    locale: DEFAULT_LOCALE,
  });
}

export function formatDateTime(date: string | Date, formatStr?: string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return '-';
  }

  return format(dateObj, formatStr ?? DEFAULT_DATETIME_FORMAT, {
    locale: DEFAULT_LOCALE,
  });
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return '-';
  }

  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: DEFAULT_LOCALE,
  });
}

export function formatShortDate(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy');
}

export function formatTime(date: string | Date): string {
  return formatDateTime(date, 'HH:mm');
}
