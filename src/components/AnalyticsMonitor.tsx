import { useState, useEffect } from 'react';
import { 
  Activity, 
  X, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle, 
  BarChart3, 
  Radio, 
  Clock, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { AnalyticsEvent } from '../types';
import { 
  getMeasurementId, 
  getEventHistory, 
  subscribeToAnalytics, 
  trackEvent 
} from '../lib/analytics';

interface AnalyticsMonitorProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function AnalyticsMonitor({ isOpen, onClose, onToggle }: AnalyticsMonitorProps) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const measurementId = getMeasurementId();

  useEffect(() => {
    setEvents(getEventHistory());
    const unsubscribe = subscribeToAnalytics((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
    });
    return unsubscribe;
  }, []);

  const handleTestEvent = () => {
    trackEvent('manual_test_event', {
      user_action: 'analytics_monitor_verify',
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Minimized Trigger Pill */}
      {!isOpen ? (
        <button
          onClick={onToggle}
          id="ga-telemetry-pill-btn"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white border border-zinc-700 shadow-xl text-xs font-mono hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-all hover:scale-102 cursor-pointer group"
          title="Inspect Google Analytics Telemetry & Visitor Engagement"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-sans font-medium text-zinc-300 group-hover:text-white">
            GA4 Engagement: <strong className="text-emerald-400 font-mono">{events.length}</strong> events
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
        </button>
      ) : (
        /* Expanded Live Analytics Dashboard */
        <div
          id="ga-telemetry-panel"
          className="w-[340px] sm:w-[420px] max-h-[500px] rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden text-xs animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Panel Header */}
          <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight flex items-center gap-2">
                  <span>Google Analytics 4 Monitor</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-medium">
                    ACTIVE
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  Tag ID: {measurementId}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close Analytics Monitor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>Tracking all section scrolls & clicks</span>
            </div>
            <button
              onClick={handleTestEvent}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-sans font-semibold"
            >
              Send Test Ping
            </button>
          </div>

          {/* Events Stream List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[320px] divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {events.length === 0 ? (
              <div className="text-center py-8 text-zinc-400 text-xs">
                Waiting for visitor interactions... Scroll through sections or click links.
              </div>
            ) : (
              events.map((evt) => (
                <div key={evt.id} className="pt-2 first:pt-0">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {evt.eventName}
                    </span>
                    <span className="text-zinc-400 text-[10px] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {evt.timestamp}
                    </span>
                  </div>

                  {evt.parameters && Object.keys(evt.parameters).length > 0 && (
                    <div className="mt-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-md break-all">
                      {Object.entries(evt.parameters).map(([k, v]) => (
                        <div key={k} className="inline-block mr-2">
                          <span className="text-zinc-400 dark:text-zinc-500">{k}:</span>{' '}
                          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                            {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Panel Footer */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
            <span>Total Captured: <strong>{events.length}</strong></span>
            <button
              onClick={() => setEvents([])}
              className="text-zinc-400 hover:text-rose-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Log</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
