import { AnalyticsEvent } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// In-memory telemetry log for user-facing engagement monitor
const eventListeners: Array<(event: AnalyticsEvent) => void> = [];
const eventHistory: AnalyticsEvent[] = [];

export function getMeasurementId(): string {
  const envVal = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_GA_MEASUREMENT_ID : undefined;
  return envVal || 'G-MOHITKUMAR2026';
}

/**
 * Initializes Google Analytics gtag.js script in the DOM
 */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  const measurementId = getMeasurementId();

  // If already initialized, avoid duplicate tag injection
  if (document.getElementById('ga-script')) return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true,
    page_title: document.title,
    page_location: window.location.href,
  });

  // Inject gtag script
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  logTelemetryEvent('ga_initialized', {
    measurement_id: measurementId,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Tracks a custom event in Google Analytics and in the local telemetry feed
 */
export function trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
  // Push to Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, {
        ...parameters,
        event_time: new Date().toISOString(),
      });
    } catch (e) {
      console.debug('[GA] Error sending event:', e);
    }
  }

  // Also notify server and local telemetry monitor
  logTelemetryEvent(eventName, parameters);

  // Send to backend telemetry API
  try {
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, parameters }),
    }).catch(() => {});
  } catch (err) {
    // Silent catch
  }
}

/**
 * Specifically tracks when a user scrolls into and views a specific section
 */
const trackedSections = new Set<string>();
export function trackSectionView(sectionId: string, sectionTitle: string): void {
  trackEvent('section_view', {
    section_id: sectionId,
    section_name: sectionTitle,
    viewport_width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });
  trackedSections.add(sectionId);
}

/**
 * Tracks clicks to external profiles (LinkedIn, GitHub, Email)
 */
export function trackProfileClick(platform: 'linkedin' | 'github' | 'email' | 'other', url: string): void {
  trackEvent('profile_click', {
    platform,
    destination_url: url,
    location: 'portfolio_navigation',
  });
}

/**
 * Internal logger to trigger UI engagement observers
 */
function logTelemetryEvent(eventName: string, parameters: Record<string, any>): void {
  const event: AnalyticsEvent = {
    id: `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    eventName,
    parameters,
  };

  eventHistory.unshift(event);
  if (eventHistory.length > 50) {
    eventHistory.pop();
  }

  eventListeners.forEach((listener) => {
    try {
      listener(event);
    } catch (e) {
      console.error('Analytics listener error:', e);
    }
  });
}

/**
 * Subscribe to live analytics stream
 */
export function subscribeToAnalytics(callback: (event: AnalyticsEvent) => void): () => void {
  eventListeners.push(callback);
  return () => {
    const idx = eventListeners.indexOf(callback);
    if (idx !== -1) eventListeners.splice(idx, 1);
  };
}

export function getEventHistory(): AnalyticsEvent[] {
  return [...eventHistory];
}
