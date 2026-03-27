// Knowledge Base - Website Content for Matching
const knowledgeBase = [
  {
    keywords: ['reconnaissance', 'discovery', 'enumeration', 'mapping', 'exposure'],
    response: 'Our **Reconnaissance** service provides automated target discovery, domain mapping, cloud asset enumeration, and external exposure analysis. It\'s the first step in understanding your attack surface.',
    category: 'Capabilities'
  },
  {
    keywords: ['vulnerability', 'vuln', 'vulnerabilities', 'weakness', 'flaw'],
    response: 'Our **Vulnerability Analysis** uses AI to identify and prioritize security vulnerabilities across your infrastructure and compliance posture. We focus on high-impact issues first.',
    category: 'Capabilities'
  },
  {
    keywords: ['control', 'mapping', 'compliance', 'gdpr', 'hipaa', 'pdpl', 'compliant', 'regulation'],
    response: 'Our **Control Mapping** automatically maps your security posture against GDPR, PDPL, and HIPAA standards. You\'ll see exactly what\'s compliant and what needs remediation.',
    category: 'Capabilities'
  },
  {
    keywords: ['report', 'evidence', 'audit', 'roadmap', 'action plan', 'summary'],
    response: 'Our **Report Generation** creates executive summaries, audit-ready evidence, 30-60 day action plans with clear ownership, and business-level risk scoring.',
    category: 'Capabilities'
  },
  {
    keywords: ['pen testing', 'penetration', 'web application', 'network penetration', 'api penetration', 'api testing'],
    response: 'Our **Pen Testing** services include:\n• Web Application Penetration Testing\n• Network Penetration Testing\n• API Penetration Testing\n\nWe identify exploitable technical weaknesses across your attack surface.',
    category: 'Services'
  },
  {
    keywords: ['offensive', 'dark web', 'phishing', 'social engineering', 'source code', 'sast', 'ciso', 'vciso'],
    response: 'Our **Offensive Security** services include:\n• Dark Web Monitoring\n• Social Engineering & Phishing Simulation\n• Source Code Review (SAST)\n• Virtual CISO (vCISO)\n\nWe proactively assess risks and improve resilience.',
    category: 'Services'
  },
  {
    keywords: ['price', 'pricing', 'cost', 'package', 'lite', 'core', 'premium'],
    response: 'We offer **3 packages**:\n\n**Lite** - OMR 80–100: External snapshot, top 5 risks, email security check, mini report\n\n**Core** - OMR 200–400: Full external assessment, cloud readiness, access review, 30-day action plan\n\n**Premium** - OMR 500–1,000: Everything in Core plus cloud security review, incident readiness, 60-day plan\n\nPrices vary by location (Oman/UAE/KSA/EU). Need a specific quote?',
    category: 'Pricing'
  },
  {
    keywords: ['how it works', 'process', 'steps', 'workflow', 'understand', 'assess', 'identify', 'act'],
    response: 'Our **process** has 4 steps:\n\n**01 Understand** - Map your domains, cloud accounts, applications, data flows\n\n**02 Assess** - Review access controls, backups, cloud settings, external exposure\n\n**03 Identify** - Translate findings into business risks, sorted by impact\n\n**04 Act** - 30-60 day roadmap with clear ownership and compliance alignment',
    category: 'How It Works'
  },
  {
    keywords: ['turnaround', 'time', 'speed', 'hours', '24h', 'quick'],
    response: 'We deliver **100% risk visibility in 24 hours**. Our automated assessment is fast without sacrificing thoroughness.',
    category: 'Features'
  },
  {
    keywords: ['automated', 'automation', 'ai', 'autonomous'],
    response: 'Our service is **fully automated**—from reconnaissance to compliance mapping. This means faster assessments, consistent results, and minimal manual effort needed from your team.',
    category: 'Features'
  },
  {
    keywords: ['contact', 'email', 'linkedin', 'reach out', 'call', 'demo', 'book'],
    response: 'You can reach us at:\n• **Email**: info@jupitercyberdefence.com\n• **LinkedIn**: Jupiter Cyber Defence\n\nOr book a free security snapshot using the form on our site. We offer 15-minute to 45-minute walkthroughs depending on your package.',
    category: 'Contact '
  },
  {
    keywords: ['assessment', 'snapshot', 'evaluate', 'check', 'scan'],
    response: 'We provide security assessments ranging from quick snapshots (Lite—OMR 80–100) to comprehensive audits (Premium—OMR 500–1,000). Start with a free external snapshot and 15-minute summary call.',
    category: 'Services'
  },
  {
    keywords: ['free', 'trial', 'demo', 'free assessment'],
    response: 'Yes! We offer a **free security snapshot** with our Lite package. You get:\n• External attack surface snapshot\n• Top 5 risk items\n• Email security check\n• 15-minute summary call\n\nBook a demo to get started.',
    category: 'Pricing'
  },
  {
    keywords: ['cloud', 'aws', 'azure', 'gcp'],
    response: 'We review cloud security posture across AWS, Azure, and GCP. Our services include:\n• Cloud readiness assessment\n• Access control review\n• Cloud-specific vulnerability analysis\n• Compliance mapping for cloud resources',
    category: 'Capabilities'
  },
  {
    keywords: ['team', 'company', 'business', 'sme', 'enterprise'],
    response: 'Our packages fit different organizations:\n\n**Lite**: Great for small teams getting started\n**Core**: Perfect for SMEs, IT firms, SaaS companies\n**Premium**: Ideal for mid-size orgs and enterprises needing comprehensive coverage',
    category: 'Services'
  }
];

// Chat Widget Class
class ChatBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
  }

  createWidget() {
    // Create widget HTML
    const widgetHTML = `
      <div id="chatbot-widget" class="chatbot-widget">
        <div class="chatbot-button" id="chatbot-toggle" aria-label="Open chat assistant" role="button" tabindex="0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="unread-badge" id="unread-badge" style="display:none;">1</span>
        </div>

        <div class="chatbot-window" id="chatbot-window" style="display:none;">
          <div class="chatbot-header">
            <div>
              <h3>Security Assistant</h3>
              <p>Ask me about capabilities, pricing, or how it works</p>
            </div>
            <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">×</button>
          </div>

          <div class="chatbot-messages" id="chatbot-messages">
            <div class="chatbot-message bot-message">
              <p>👋 Hi! I'm here to answer questions about Jupiter Cyber Defence. Ask me about our services, pricing, or how the assessment process works.</p>
            </div>
          </div>

          <div class="chatbot-input-area">
            <form id="chatbot-form" onsubmit="chatbot.handleMessage(event)">
              <input 
                type="text" 
                id="chatbot-input" 
                placeholder="Type your question..."
                autocomplete="off"
              />
              <button type="submit" aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.50612381,-0.1 2.40999899,-0.0429026 1.77946707,0.52 C0.994623095,1.16151496 0.837654326,2.25040187 1.15159189,3.0358888 L3.03521743,9.4768819 C3.03521743,9.6339793 3.34915502,9.79108673 3.50612381,9.79108673 L16.6915026,10.5765736 C16.6915026,10.5765736 17.1624089,10.5765736 17.1624089,11.0478657 C17.1624089,11.5191579 16.6915026,11.4744748 16.6915026,12.4744748 Z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const form = document.getElementById('chatbot-form');

    toggleBtn.addEventListener('click', () => this.toggleChat());
    toggleBtn.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') this.toggleChat();
    });
    closeBtn.addEventListener('click', () => this.toggleChat());
    form.addEventListener('submit', (e) => this.handleMessage(e));
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const badge = document.getElementById('unread-badge');

    if (this.isOpen) {
      window.style.display = 'flex';
      badge.style.display = 'none';
      document.getElementById('chatbot-input').focus();
    } else {
      window.style.display = 'none';
    }
  }

  handleMessage(event) {
    event.preventDefault();
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Get bot response
    setTimeout(() => {
      const response = this.findAnswer(message);
      this.addMessage(response.answer, 'bot', response.matched);
    }, 500);
  }

  findAnswer(query) {
    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    // Search knowledge base
    for (const item of knowledgeBase) {
      let score = 0;
      for (const keyword of item.keywords) {
        if (lowerQuery.includes(keyword)) {
          score += keyword.length; // Longer matches weighted higher
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && bestScore > 0) {
      return { answer: bestMatch.response, matched: true };
    } else {
      return {
        answer: `I'm not sure about that. Could you share your details so our team can help? Just type your name, email, and question below.`,
        matched: false
      };
    }
  }

  addMessage(text, sender, matched = true) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${sender}-message`;

    if (sender === 'bot' && !matched) {
      // Show contact form for unmatched queries
      messageEl.innerHTML = `
        <p>${text}</p>
        <form class="quick-contact-form" onsubmit="chatbot.submitContactForm(event)">
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Your email" required />
          <textarea name="message" placeholder="Your question or request..." required></textarea>
          <button type="submit" class="btn-small">Send to team</button>
        </form>
      `;
    } else {
      messageEl.innerHTML = `<p>${text}</p>`;
    }

    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Create hidden form for submission via FormSubmit
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = 'https://formsubmit.co/info@jupitercyberdefence.com';
    hiddenForm.style.display = 'none';

    hiddenForm.innerHTML = `
      <input type="hidden" name="_subject" value="New query from Chat Assistant" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="name" value="${formData.get('name')}" />
      <input type="email" name="email" value="${formData.get('email')}" />
      <textarea name="message">${formData.get('message')}</textarea>
    `;

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    // Show success message
    this.addMessage('✅ Thanks! We\'ve received your message. Our team will reach out shortly.', 'bot');
    form.reset();
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatBot();
    window.chatbot = chatbot; // Make it global for form submission
  });
} else {
  const chatbot = new ChatBot();
  window.chatbot = chatbot;
}
