import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Mail, 
  Send, 
  Linkedin, 
  Github, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { ContactFormData, EmailConfirmationResult } from '../types';
import { trackEvent, trackProfileClick } from '../lib/analytics';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    projectType: 'Full-Time Opportunity',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<EmailConfirmationResult | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const inquiryTypes = [
    'Full-Time Opportunity',
    'Freelance / Contract Project',
    'Open-Source Collaboration',
    'Technical Inquiry',
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address so I can respond.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please enter a message of at least 10 characters.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      trackEvent('contact_form_attempt', {
        project_type: formData.projectType,
        has_subject: Boolean(formData.subject),
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConfirmationResult(result);
        trackEvent('contact_form_submit_success', {
          receipt_id: result.receiptId,
          method: result.confirmationMethod,
          project_type: formData.projectType,
        });
      } else {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(err.message || 'An error occurred while dispatching your inquiry. Please try again or email directly.');
      trackEvent('contact_form_submit_error', { error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyReceipt = (receiptId: string) => {
    navigator.clipboard.writeText(receiptId);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const handleResetForm = () => {
    setConfirmationResult(null);
    setShowEmailPreview(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      projectType: 'Full-Time Opportunity',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-zinc-50/60 dark:bg-zinc-900/40 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Have an open role, technical challenge, or consulting project? Submit an inquiry below and you will automatically receive a confirmation email with a tracked reference ID.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels & Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Channel Cards */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-5 shadow-xs">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                Direct Contact & Profiles
              </h3>

              <div className="space-y-3.5">
                {/* Email Item */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => trackProfileClick('email', personalInfo.email)}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Direct Email</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {personalInfo.email}
                    </div>
                  </div>
                </a>

                {/* LinkedIn Profile */}
                <a
                  id="contact-linkedin-link"
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProfileClick('linkedin', personalInfo.linkedinUrl)}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-[#0077b5] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0077b5] flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">LinkedIn Professional Profile</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#0077b5]">
                      mohit-kumar-658338257
                    </div>
                  </div>
                </a>

                {/* GitHub Profile */}
                <a
                  id="contact-github-link"
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProfileClick('github', personalInfo.githubUrl)}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">GitHub Repositories</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      @Mohit2004Gothwal
                    </div>
                  </div>
                </a>
              </div>

              {/* Service Level Guarantees */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Prompt reply: Typically within <strong>24 hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated email receipt generated upon submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Available for Full-Time, Remote & Hybrid Roles</span>
                </div>
              </div>
            </div>

            {/* Automated Dispatch Guarantee Notice */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 space-y-2">
              <div className="font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <FileCheck className="w-4 h-4" />
                <span>Automated Confirmation Pipeline</span>
              </div>
              <p className="text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed text-xs">
                When you submit this inquiry form, the system dispatches an automated verification email to your specified address containing the message summary, submission timestamp, and direct reference ID.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form or Confirmation Screen */}
          <div className="lg:col-span-7">
            {confirmationResult ? (
              /* Success & Automated Email Confirmation Card */
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-800/80 p-6 sm:p-8 shadow-xl space-y-6">
                {/* Header Status */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      Inquiry Received & Confirmed!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                      Automated confirmation email has been dispatched.
                    </p>
                  </div>
                </div>

                {/* Receipt Details Box */}
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-zinc-400">Tracking Reference</span>
                    <button
                      onClick={() => handleCopyReceipt(confirmationResult.receiptId)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {copiedReceipt ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    {confirmationResult.receiptId}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700 text-xs">
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Recipient Email:</span>{' '}
                      <strong className="text-zinc-800 dark:text-zinc-200 font-medium">
                        {confirmationResult.recipient}
                      </strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Dispatch Method:</span>{' '}
                      <span className="capitalize font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                        {confirmationResult.confirmationMethod === 'smtp' ? 'Live SMTP Transport' : 'Simulated Delivery Queue'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Preview Toggle */}
                <div>
                  <button
                    onClick={() => setShowEmailPreview(!showEmailPreview)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showEmailPreview ? 'Hide Automated Confirmation Email' : 'Preview Sent Confirmation Email'}</span>
                  </button>

                  {showEmailPreview && (
                    <div className="mt-3 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 font-sans text-xs space-y-3">
                      <div className="pb-2 border-b border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-zinc-500">
                        <div><strong>To:</strong> {confirmationResult.emailPreview.to}</div>
                        <div><strong>Subject:</strong> {confirmationResult.emailPreview.subject}</div>
                      </div>
                      <div
                        className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs"
                        dangerouslySetInnerHTML={{ __html: confirmationResult.emailPreview.html }}
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Send Another Inquiry</span>
                  </button>

                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077b5]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Main Inquiry Form */
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    Send an Inquiry
                  </h3>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Auto-Confirmation Enabled
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-800 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-800 transition-all"
                    />
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Confirmation receipt will be dispatched here.
                    </span>
                  </div>
                </div>

                {/* Subject & Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. Software Engineer Role / Project"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-800 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                    >
                      Category
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-800 transition-all"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your inquiry, project scope, team role, or timeline..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-800 transition-all resize-y"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                    ⚡ Instant delivery confirmation
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20 active:scale-98 cursor-pointer w-full sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending & Generating Confirmation...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
