## 📄 DAFTAR FILE

1. `index.html` (46.58 KB)
2. `jest.config.js` (0.46 KB)
3. `package.json` (2.63 KB)
4. `src/core/constants.ts` (2.03 KB)
5. `src/core/formatter.ts` (14.78 KB)
6. `src/core/validator.ts` (3.67 KB)
7. `src/hooks/useRupiah.ts` (7.56 KB)
8. `src/index.ts` (5.05 KB)
9. `src/parse/parser.ts` (2.37 KB)
10. `src/parse/sanitizer.ts` (1.05 KB)
11. `src/react/index.tsx` (0.77 KB)
12. `src/react/RupiahDisplay.tsx` (6.13 KB)
13. `src/utils/helpers.ts` (6.27 KB)
14. `src/utils/locale.ts` (1.03 KB)
15. `src/utils/types.ts` (1.19 KB)
16. `tests/formatter.test.ts` (4.33 KB)
17. `tests/parser.test.ts` (1.35 KB)
18. `tests/utils.test.ts` (1.02 KB)
19. `tsconfig.build.json` (0.33 KB)
20. `tsconfig.jest.json` (0.26 KB)
21. `tsconfig.json` (0.57 KB)
22. `tsconfig.react.json` (0.32 KB)

---

## 📝 KONTEN FILE

//index.html

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@devnovaa-id/new-rupiah-formatter - Rupiah Formatter Library</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --secondary: #10b981;
            --dark: #1f2937;
            --light: #f8fafc;
            --gray: #6b7280;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --border: #e5e7eb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: var(--dark);
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header Styles */
        .header {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            border-radius: 20px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="white" opacity="0.1"/></svg>');
        }

        .badges {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
            margin: 1rem 0;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50px;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Navigation */
        .nav-container {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            position: sticky;
            top: 20px;
            z-index: 100;
        }

        .nav-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            list-style: none;
        }

        .nav-tabs li {
            flex: 1;
            min-width: 200px;
        }

        .nav-tabs a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            background: var(--light);
            border-radius: 10px;
            text-decoration: none;
            color: var(--dark);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .nav-tabs a:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-3px);
        }

        .nav-tabs a.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary-dark);
        }

        /* Content Sections */
        .content-section {
            background: white;
            border-radius: 15px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.5s ease forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .content-section:nth-child(2) { animation-delay: 0.1s; }
        .content-section:nth-child(3) { animation-delay: 0.2s; }
        .content-section:nth-child(4) { animation-delay: 0.3s; }
        .content-section:nth-child(5) { animation-delay: 0.4s; }

        .section-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 3px solid var(--primary);
        }

        .section-header i {
            font-size: 2rem;
            color: var(--primary);
            background: var(--light);
            padding: 15px;
            border-radius: 12px;
        }

        .section-title {
            font-size: 1.8rem;
            color: var(--dark);
        }

        /* Code Blocks */
        .code-block {
            position: relative;
            margin: 1.5rem 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
            background: var(--dark);
            color: white;
            font-family: 'Consolas', monospace;
        }

        .code-language {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .copy-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 5px 15px;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
            font-family: inherit;
        }

        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        pre[class*="language-"] {
            margin: 0;
            border-radius: 0;
            max-height: 500px;
            overflow-y: auto;
        }

        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 2rem 0;
        }

        .feature-card {
            background: var(--light);
            padding: 25px;
            border-radius: 12px;
            border-left: 5px solid var(--primary);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);
        }

        .feature-icon {
            font-size: 2rem;
            color: var(--primary);
            margin-bottom: 15px;
        }

        .feature-title {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: var(--dark);
        }

        /* Table Styles */
        .api-table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .api-table th {
            background: var(--primary);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }

        .api-table td {
            padding: 15px;
            border-bottom: 1px solid var(--border);
        }

        .api-table tr:hover {
            background: var(--light);
        }

        /* Changelog */
        .changelog {
            list-style: none;
            margin: 2rem 0;
        }

        .changelog li {
            padding: 20px;
            margin-bottom: 15px;
            background: var(--light);
            border-radius: 10px;
            border-left: 4px solid var(--primary);
            position: relative;
        }

        .changelog-date {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-bottom: 10px;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 3rem 1rem;
            background: linear-gradient(135deg, var(--dark) 0%, #111827 100%);
            color: white;
            border-radius: 20px;
            margin-top: 2rem;
        }

        .author-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin: 2rem 0;
        }

        .author-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
        }

        .social-links {
            display: flex;
            gap: 15px;
            margin: 1rem 0;
        }

        .social-links a {
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            transition: background 0.3s;
        }

        .social-links a:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .content-section {
                padding: 1.5rem;
            }
            
            .nav-tabs li {
                min-width: 100%;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .section-header {
                flex-direction: column;
                text-align: center;
            }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: var(--light);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary-dark);
        }

        /* Utility Classes */
        .mb-2 { margin-bottom: 2rem; }
        .mt-2 { margin-top: 2rem; }
        .text-center { text-align: center; }
        .text-primary { color: var(--primary); }
        .bg-light { background: var(--light); }
        .rounded { border-radius: 10px; }
        .shadow { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="badges">
                <span class="badge">
                    <i class="fas fa-tag"></i>
                    <span id="version">v1.1.0</span>
                </span>
                <span class="badge">
                    <i class="fas fa-balance-scale"></i>
                    MIT License
                </span>
                <span class="badge">
                    <i class="fab fa-typescript"></i>
                    TypeScript
                </span>
                <span class="badge">
                    <i class="fas fa-check-circle"></i>
                    85% Coverage
                </span>
                <span class="badge">
                    <i class="fas fa-weight"></i>
                    <5KB Bundle
                </span>
            </div>
            
            <h1 style="font-size: 3rem; margin: 1rem 0;">
                @devnovaa-id/new-rupiah-formatter
            </h1>
            
            <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto 2rem; opacity: 0.9;">
                ✨ Flexible, Customizable Rupiah Formatter with International & React Support ✨
            </p>
            
            <p style="font-style: italic; font-size: 1.1rem; margin-bottom: 2rem;">
                Format, parse, and validate Rupiah values easily - for JavaScript, TypeScript, and React
            </p>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="scrollToSection('installation')" class="copy-btn" style="background: white; color: var(--primary);">
                    <i class="fas fa-download"></i> Get Started
                </button>
                <button onclick="scrollToSection('demo')" class="copy-btn" style="background: transparent; border: 2px solid white;">
                    <i class="fas fa-play"></i> Try Demo
                </button>
                <button onclick="scrollToSection('api')" class="copy-btn" style="background: transparent; border: 2px solid white;">
                    <i class="fas fa-book"></i> Documentation
                </button>
            </div>
        </header>

        <!-- Navigation -->
        <nav class="nav-container">
            <ul class="nav-tabs">
                <li><a href="#installation" class="active" onclick="changeTab(this)">
                    <i class="fas fa-download"></i> Installation
                </a></li>
                <li><a href="#quickstart" onclick="changeTab(this)">
                    <i class="fas fa-rocket"></i> Quick Start
                </a></li>
                <li><a href="#features" onclick="changeTab(this)">
                    <i class="fas fa-star"></i> Features
                </a></li>
                <li><a href="#advanced" onclick="changeTab(this)">
                    <i class="fas fa-cogs"></i> Advanced Usage
                </a></li>
                <li><a href="#api" onclick="changeTab(this)">
                    <i class="fas fa-code"></i> API Reference
                </a></li>
                <li><a href="#demo" onclick="changeTab(this)">
                    <i class="fas fa-play-circle"></i> Live Demo
                </a></li>
            </ul>
        </nav>

        <!-- Installation Section -->
        <section id="installation" class="content-section">
            <div class="section-header">
                <i class="fas fa-download"></i>
                <h2 class="section-title">📦 Installation</h2>
            </div>
            
            <p style="margin-bottom: 1.5rem;">
                Install the package using your preferred package manager:
            </p>
            
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fas fa-terminal"></i> Terminal
                    </div>
                    <button class="copy-btn" onclick="copyCode('install-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="install-code"><code class="language-bash">
# npm
npm install @devnovaa-id/new-rupiah-formatter

# yarn
yarn add @devnovaa-id/new-rupiah-formatter

# pnpm
pnpm add @devnovaa-id/new-rupiah-formatter
                </code></pre>
            </div>
        </section>

        <!-- Quick Start Section -->
        <section id="quickstart" class="content-section">
            <div class="section-header">
                <i class="fas fa-rocket"></i>
                <h2 class="section-title">🚀 Quick Start</h2>
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem;">Basic Formatting</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-js"></i> JavaScript
                    </div>
                    <button class="copy-btn" onclick="copyCode('basic-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="basic-code"><code class="language-javascript">
import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

console.log(formatRupiah(1000));           // "Rp 1.000"
console.log(formatRupiah(1234567.89));    // "Rp 1.234.567,89"
console.log(formatRupiah(-5000));         // "-Rp 5.000"
                </code></pre>
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem;">Parsing & Validation</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-js"></i> JavaScript
                    </div>
                    <button class="copy-btn" onclick="copyCode('parse-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="parse-code"><code class="language-javascript">
import { parseRupiah, isValidRupiah } from '@devnovaa-id/new-rupiah-formatter';

parseRupiah('Rp 1.234.567,89');    // 1234567.89
isValidRupiah('Rp 1.000');         // true
isValidRupiah('invalid string');   // false
                </code></pre>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="content-section">
            <div class="section-header">
                <i class="fas fa-star"></i>
                <h2 class="section-title">🎯 Key Features</h2>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3 class="feature-title">Easy to Use</h3>
                    <p>One function for all needs with intuitive API</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="feature-title">International</h3>
                    <p>Multi-locale support (ID, US, DE, FR, etc.)</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fab fa-react"></i>
                    </div>
                    <h3 class="feature-title">React Ready</h3>
                    <p>Built-in hooks & components for React</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-sliders-h"></i>
                    </div>
                    <h3 class="feature-title">Customizable</h3>
                    <p>Full control over formatting options</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-palette"></i>
                    </div>
                    <h3 class="feature-title">Alias System</h3>
                    <p>Create your own formatting presets</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-feather"></i>
                    </div>
                    <h3 class="feature-title">Zero Dependencies</h3>
                    <p>Lightweight & fast with no external dependencies</p>
                </div>
            </div>
        </section>

        <!-- Advanced Usage Section -->
        <section id="advanced" class="content-section">
            <div class="section-header">
                <i class="fas fa-cogs"></i>
                <h2 class="section-title">🔧 Advanced Usage</h2>
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem;">Formatter Class</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-js"></i> JavaScript
                    </div>
                    <button class="copy-btn" onclick="copyCode('formatter-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="formatter-code"><code class="language-javascript">
import { RupiahFormatter } from '@devnovaa-id/new-rupiah-formatter';

// 1. Instance with custom configuration
const formatter = new RupiahFormatter({
  symbol: 'IDR',
  decimalSeparator: '.',
  thousandSeparator: ',',
  spaceBetween: false
});

formatter.format(1234567.89); // "IDR1,234,567.89"

// 2. Create alias for frequently used formats
formatter.createAlias('compact', {
  stripTrailingZero: true,
  spaceBetween: false
});
formatter.formatWithAlias(1000.00, 'compact'); // "Rp1.000"

// 3. Use built-in presets
formatter.usePreset('international');
formatter.format(1234567.89); // "IDR 1,234,567.89"
                </code></pre>
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem;">React Hook & Component</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-jsx"></i> React JSX
                    </div>
                    <button class="copy-btn" onclick="copyCode('react-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="react-code"><code class="language-jsx">
import React from 'react';
import { useRupiah, RupiahDisplay } from '@devnovaa-id/new-rupiah-formatter/react';

function ProductCard({ product }) {
  const { format } = useRupiah();
  
  return (
    &lt;div className="product-card"&gt;
      &lt;h3&gt;{product.name}&lt;/h3&gt;
      
      {/* Using hook */}
      &lt;p&gt;Price: {format(product.price)}&lt;/p&gt;
      
      {/* Using component */}
      &lt;RupiahDisplay 
        value={product.discountPrice} 
        className="discount-price"
        options={{
          symbol: 'Rp',
          decimalSeparator: ',',
          thousandSeparator: '.',
          negativeFormat: 'parentheses'
        }}
      /&gt;
    &lt;/div&gt;
  );
}
                </code></pre>
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem;">International Support</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-js"></i> JavaScript
                    </div>
                    <button class="copy-btn" onclick="copyCode('intl-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="intl-code"><code class="language-javascript">
import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Indonesian format (default)
formatRupiah(1234567.89); // "Rp 1.234.567,89"

// US/International format
formatRupiah(1234567.89, { locale: 'en-US' }); // "IDR 1,234,567.89"

// German format
formatRupiah(1234567.89, { locale: 'de-DE' }); // "IDR 1.234.567,89"

// French format
formatRupiah(1234567.89, { locale: 'fr-FR' }); // "IDR 1 234 567,89"
                </code></pre>
            </div>
        </section>

        <!-- API Reference Section -->
        <section id="api" class="content-section">
            <div class="section-header">
                <i class="fas fa-code"></i>
                <h2 class="section-title">📖 API Reference</h2>
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem;">Core Functions</h3>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Function</th>
                        <th>Type Signature</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>formatRupiah</code></td>
                        <td><code>(value: InputValue, options?: Options) => string</code></td>
                        <td>Format value to Rupiah string</td>
                    </tr>
                    <tr>
                        <td><code>parseRupiah</code></td>
                        <td><code>(formattedString: string) => number</code></td>
                        <td>Parse Rupiah string to number</td>
                    </tr>
                    <tr>
                        <td><code>isValidRupiah</code></td>
                        <td><code>(formattedString: string) => boolean</code></td>
                        <td>Validate Rupiah string format</td>
                    </tr>
                </tbody>
            </table>
            
            <h3 style="margin: 2rem 0 1rem;">RupiahFormatter Class</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-typescript"></i> TypeScript
                    </div>
                    <button class="copy-btn" onclick="copyCode('class-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="class-code"><code class="language-typescript">
class RupiahFormatter {
  constructor(options?: Partial&lt;RupiahFormatOptions&gt;);
  
  format(value: InputValue, customOptions?: Partial&lt;RupiahFormatOptions&gt;): string;
  parse(formattedString: string): number;
  createAlias(name: string, options: Partial&lt;RupiahFormatOptions&gt;): void;
  formatWithAlias(value: InputValue, alias: string): string;
  usePreset(presetName: keyof typeof PRESETS): void;
  updateOptions(newOptions: Partial&lt;RupiahFormatOptions&gt;): void;
  getOptions(): RupiahFormatOptions;
  listAliases(): string[];
  removeAlias(name: string): boolean;
}
                </code></pre>
            </div>
            
            <h3 style="margin: 2rem 0 1rem;">Formatting Options</h3>
            <div class="code-block">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fab fa-typescript"></i> TypeScript
                    </div>
                    <button class="copy-btn" onclick="copyCode('options-code')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="options-code"><code class="language-typescript">
interface RupiahFormatOptions {
  symbol?: string;                    // Currency symbol (default: 'Rp')
  decimalSeparator?: string;          // Decimal separator (default: ',')
  thousandSeparator?: string;         // Thousand separator (default: '.')
  precision?: number;                 // Decimal digits (default: 0)
  symbolPosition?: 'before' | 'after'; // Symbol position (default: 'before')
  spaceBetween?: boolean;             // Space between symbol and number (default: true)
  stripTrailingZero?: boolean;        // Remove trailing zeros (default: true)
  negativeFormat?: 'sign' | 'parentheses'; // Negative format (default: 'sign')
  locale?: string;                    // Locale (default: 'id-ID')
  fallback?: string;                  // Fallback for zero value (default: 'Rp 0')
  currencyCode?: string;              // Currency code (default: 'IDR')
}
                </code></pre>
            </div>
        </section>

        <!-- Live Demo Section -->
        <section id="demo" class="content-section">
            <div class="section-header">
                <i class="fas fa-play-circle"></i>
                <h2 class="section-title">🎮 Live Demo</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div>
                    <h3 style="margin-bottom: 1rem;">Input Parameters</h3>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Amount</label>
                        <input type="number" id="demo-amount" value="1234567.89" 
                               style="width: 100%; padding: 10px; border: 2px solid var(--border); border-radius: 8px;">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Symbol</label>
                        <select id="demo-symbol" style="width: 100%; padding: 10px; border: 2px solid var(--border); border-radius: 8px;">
                            <option value="Rp">Rp (Indonesian)</option>
                            <option value="IDR">IDR (International)</option>
                            <option value="$">$ (Dollar)</option>
                            <option value="€">€ (Euro)</option>
                            <option value="">No Symbol</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Preset</label>
                        <select id="demo-preset" style="width: 100%; padding: 10px; border: 2px solid var(--border); border-radius: 8px;">
                            <option value="standard">Standard</option>
                            <option value="compact">Compact</option>
                            <option value="international">International</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="financial">Financial</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 1rem;">
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="checkbox" id="demo-space" checked>
                            <span>Space Between</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="checkbox" id="demo-strip" checked>
                            <span>Strip Trailing Zero</span>
                        </label>
                    </div>
                    
                    <button onclick="runDemo()" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px; margin-top: 1rem; cursor: pointer;">
                        <i class="fas fa-play"></i> Format Rupiah
                    </button>
                </div>
                
                <div>
                    <h3 style="margin-bottom: 1rem;">Output</h3>
                    <div id="demo-output" style="background: var(--light); padding: 2rem; border-radius: 12px; min-height: 200px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; color: var(--primary);">
                        Rp 1.234.567,89
                    </div>
                    
                    <div style="margin-top: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">Code Example</h4>
                        <div id="demo-code" style="background: #1a1a1a; color: white; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem;">
// Generated code will appear here
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Changelog Section -->
        <section id="changelog" class="content-section">
            <div class="section-header">
                <i class="fas fa-history"></i>
                <h2 class="section-title">📝 Changelog</h2>
            </div>
            
            <ul class="changelog">
                <li>
                    <span class="changelog-date">v1.1.0 — 2025-12-23</span>
                    <ul style="margin-left: 1.5rem;">
                        <li>Added new presets: ecommerce, financial, mobile, crypto</li>
                        <li>Enhanced formatting options with hideZero and formatStyle</li>
                        <li>Added abbreviation formatting (K, M, B, T)</li>
                        <li>Added percentage and growth calculations</li>
                        <li>Added range formatting</li>
                        <li>Added template-based formatting</li>
                        <li>Improved error handling and validation</li>
                        <li>Added caching for better performance</li>
                        <li>New React hooks: useRupiahState, useRupiahInput</li>
                        <li>Enhanced RupiahDisplay component with new features</li>
                        <li>Improved TypeScript definitions</li>
                    </ul>
                </li>
                
                <li>
                    <span class="changelog-date">v1.0.0 — 2025-12-15</span>
                    <ul style="margin-left: 1.5rem;">
                        <li>Initial release</li>
                        <li>Core formatting functionality</li>
                        <li>International locale support</li>
                        <li>React hooks & components</li>
                        <li>Comprehensive test suite</li>
                        <li>TypeScript definitions</li>
                        <li>Zero dependencies</li>
                    </ul>
                </li>
            </ul>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">🚀 Ready for production?</h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9;">
                Yes! This library is 100% test covered, TypeScript supported, zero dependencies, and production ready.
            </p>
            
            <div class="code-block" style="max-width: 500px; margin: 0 auto 2rem;">
                <div class="code-header">
                    <div class="code-language">
                        <i class="fas fa-terminal"></i> Terminal
                    </div>
                    <button class="copy-btn" onclick="copyCode('footer-install')">
                        <i class="far fa-copy"></i> Copy
                    </button>
                </div>
                <pre id="footer-install"><code class="language-bash">
npm install @devnovaa-id/new-rupiah-formatter
                </code></pre>
            </div>
            
            <div class="author-info">
                <div class="author-avatar">
                    <i class="fas fa-key"></i>
                </div>
                <div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">this key</h3>
                    <p style="opacity: 0.9;">📧 this.key@devnova.icu</p>
                </div>
            </div>
            
            <div class="social-links">
                <a href="https://devnova.icu" target="_blank">
                    <i class="fas fa-globe"></i> Website
                </a>
                <a href="https://api.devnova.icu" target="_blank">
                    <i class="fas fa-code"></i> API Service
                </a>
                <a href="https://github.com/devnovaa-id/new-rupiah-formatter" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <a href="https://saweria.co/thisssskeyyyy" target="_blank">
                    <i class="fas fa-heart"></i> Support
                </a>
            </div>
            
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p>Made with ❤️ by <strong>DevNova-ID</strong></p>
                <p style="opacity: 0.8; margin-top: 0.5rem;">Making Rupiah formatting easier, more flexible, and professional.</p>
            </div>
        </footer>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    <script>
        // Tab Navigation
        function changeTab(clickedTab) {
            document.querySelectorAll('.nav-tabs a').forEach(tab => {
                tab.classList.remove('active');
            });
            clickedTab.classList.add('active');
        }

        // Copy Code Function
        function copyCode(elementId) {
            const codeElement = document.getElementById(elementId);
            const code = codeElement.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const button = event.target.closest('.copy-btn');
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.style.background = 'var(--success)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                }, 2000);
            });
        }

        // Scroll to Section
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active tab
            document.querySelectorAll('.nav-tabs a').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('href') === `#${sectionId}`) {
                    tab.classList.add('active');
                }
            });
        }

        // Live Demo Function
        function runDemo() {
            const amount = parseFloat(document.getElementById('demo-amount').value) || 0;
            const symbol = document.getElementById('demo-symbol').value;
            const preset = document.getElementById('demo-preset').value;
            const spaceBetween = document.getElementById('demo-space').checked;
            const stripTrailingZero = document.getElementById('demo-strip').checked;
            
            // Format based on preset
            let formatted = '';
            let code = '';
            
            switch(preset) {
                case 'standard':
                    formatted = formatStandard(amount, symbol, spaceBetween, stripTrailingZero);
                    code = generateCode('standard', amount, symbol, spaceBetween, stripTrailingZero);
                    break;
                case 'compact':
                    formatted = formatCompact(amount, symbol);
                    code = generateCode('compact', amount, symbol);
                    break;
                case 'international':
                    formatted = formatInternational(amount, symbol, spaceBetween);
                    code = generateCode('international', amount, symbol, spaceBetween);
                    break;
                case 'ecommerce':
                    formatted = formatEcommerce(amount, symbol);
                    code = generateCode('ecommerce', amount, symbol);
                    break;
                case 'financial':
                    formatted = formatFinancial(amount, symbol, spaceBetween);
                    code = generateCode('financial', amount, symbol, spaceBetween);
                    break;
                case 'mobile':
                    formatted = formatMobile(amount, symbol);
                    code = generateCode('mobile', amount, symbol);
                    break;
            }
            
            document.getElementById('demo-output').textContent = formatted;
            document.getElementById('demo-code').textContent = code;
            Prism.highlightElement(document.getElementById('demo-code'));
        }

        // Formatting Functions for Demo
        function formatStandard(amount, symbol, spaceBetween, stripTrailingZero) {
            const space = spaceBetween ? ' ' : '';
            const formattedAmount = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: stripTrailingZero ? 0 : 2,
                maximumFractionDigits: 2
            }).format(amount);
            
            return `${symbol}${space}${formattedAmount}`;
        }

        function formatCompact(amount, symbol) {
            const formattedAmount = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
            
            return `${symbol}${formattedAmount}`;
        }

        function formatInternational(amount, symbol, spaceBetween) {
            const space = spaceBetween ? ' ' : '';
            const formattedAmount = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
            
            return `${symbol}${space}${formattedAmount}`;
        }

        function formatEcommerce(amount, symbol) {
            if (amount === 0) return 'Gratis';
            const formattedAmount = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
            
            return `${symbol}${formattedAmount}`;
        }

        function formatFinancial(amount, symbol, spaceBetween) {
            const space = spaceBetween ? ' ' : '';
            const formattedAmount = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(Math.abs(amount));
            
            if (amount < 0) {
                return `(${symbol}${space}${formattedAmount})`;
            }
            
            return `${symbol}${space}${formattedAmount}`;
        }

        function formatMobile(amount, symbol) {
            const formattedAmount = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
            
            return `${symbol}${formattedAmount}`;
        }

        function generateCode(preset, amount, symbol, spaceBetween, stripTrailingZero) {
            switch(preset) {
                case 'standard':
                    return `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

formatRupiah(${amount}, {
  symbol: '${symbol}',
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: ${stripTrailingZero ? 0 : 2},
  symbolPosition: 'before',
  spaceBetween: ${spaceBetween},
  stripTrailingZero: ${stripTrailingZero}
});`;

                case 'compact':
                    return `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Using preset
formatRupiah(${amount}, { preset: 'compact' });

// Or with custom options
formatRupiah(${amount}, {
  symbol: '${symbol}',
  spaceBetween: false,
  stripTrailingZero: true,
  precision: 0
});`;

                case 'international':
                    return `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Using preset
formatRupiah(${amount}, { preset: 'international' });

// Or with custom options
formatRupiah(${amount}, {
  symbol: '${symbol}',
  locale: 'en-US',
  decimalSeparator: '.',
  thousandSeparator: ',',
  spaceBetween: ${spaceBetween}
});`;

                case 'ecommerce':
                    return `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Using preset
formatRupiah(${amount}, { preset: 'ecommerce' });

// Or with custom options
formatRupiah(${amount}, {
  symbol: '${symbol}',
  precision: 0,
  stripTrailingZero: true,
  spaceBetween: false,
  fallback: 'Gratis'
});`;

                case 'financial':
                    return `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Using preset
formatRupiah(${amount}, { preset: 'financial' });

// Or with custom options
formatRupiah(${amount}, {
  symbol: '${symbol}',
  precision: 2,
  stripTrailingZero: false,
  spaceBetween: ${spaceBetween},
  negativeFormat: 'parentheses'
});`;

                case 'mobile':
                    return `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Using preset
formatRupiah(${amount}, { preset: 'mobile' });

// Or with custom options
formatRupiah(${amount}, {
  symbol: '${symbol}',
  precision: 0,
  stripTrailingZero: true,
  spaceBetween: false
});`;
            }
        }

        // Initialize demo on load
        document.addEventListener('DOMContentLoaded', function() {
            runDemo();
            
            // Highlight all code blocks
            document.querySelectorAll('pre code').forEach((block) => {
                Prism.highlightElement(block);
            });
            
            // Update version from package.json
            fetch('https://raw.githubusercontent.com/devnovaa-id/new-rupiah-formatter/main/package.json')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('version').textContent = `v${data.version}`;
                })
                .catch(() => {
                    console.log('Could not fetch package version');
                });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId !== '#') {
                    scrollToSection(targetId.substring(1));
                }
            });
        });

        // Intersection Observer for tab highlighting
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    document.querySelectorAll('.nav-tabs a').forEach(tab => {
                        tab.classList.remove('active');
                        if (tab.getAttribute('href') === `#${id}`) {
                            tab.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    </script>
</body>
</html>

---

//jest.config.js

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
    }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};

---

//package.json

{
  "name": "@devnovaa-id/new-rupiah-formatter",
  "version": "1.2.0",
  "description": "A flexible, customizable Rupiah formatter library with international support - Enhanced with new features and stability improvements",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./react": {
      "import": "./dist/react/index.esm.js",
      "require": "./dist/react/index.js",
      "types": "./dist/react/index.d.ts"
    }
  },
  "scripts": {
    "build": "npm run clean && npm run build:cjs && npm run build:esm && npm run build:react",
    "build:cjs": "tsc -p tsconfig.build.json --module commonjs --outDir dist",
    "build:esm": "tsc -p tsconfig.build.json --module esnext --outDir dist/esm && cp dist/esm/index.js dist/index.esm.js",
    "build:react": "tsc -p tsconfig.react.json --module esnext --outDir dist/react && cp dist/react/react/index.js dist/react/index.esm.js",
    "clean": "rm -rf dist coverage",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage --coverageReporters=text-lcov | coveralls",
    "lint": "eslint src/**/*.ts --max-warnings 5",
    "lint:fix": "eslint src/**/*.ts --fix --max-warnings 5",
    "type-check": "tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.react.json",
    "prepublishOnly": "npm run type-check && npm run test && npm run build",
    "prebuild": "npm run type-check && npm run lint"
  },
  "keywords": [
    "rupiah",
    "currency",
    "formatter",
    "indonesia",
    "money",
    "format",
    "international",
    "react",
    "vue",
    "angular",
    "typescript",
    "customizable",
    "flexible",
    "validation",
    "error-handling"
  ],
  "author": "this key <this.key@devnova.icu>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/devnovaa-id/new-rupiah-formatter.git"
  },
  "bugs": {
    "url": "https://github.com/devnovaa-id/new-rupiah-formatter/issues"
  },
  "homepage": "https://devnova.icu/packages/rupiah-formatter",
  "devDependencies": {
    "@jest/globals": "^30.2.0",
    "@types/jest": "^29.5.14",
    "@types/react": "^18.3.27",
    "@types/react-dom": "^18.3.7",
    "@typescript-eslint/eslint-plugin": "^6.13.1",
    "@typescript-eslint/parser": "^6.13.1",
    "eslint": "^8.54.0",
    "jest": "^29.7.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "ts-jest": "^29.4.6",
    "typescript": "^5.3.2"
  },
  "peerDependencies": {
    "react": ">=16.8.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}

---

//src/core/constants.ts

export const DEFAULT_OPTIONS = {
  symbol: 'Rp',
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: 2,
  symbolPosition: 'before' as const,
  spaceBetween: true,
  stripTrailingZero: true,
  negativeFormat: 'sign' as const,
  fallback: 'Rp 0',
  locale: 'id-ID',
  currencyCode: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  hideZero: false,
  formatStyle: 'standard' as const
} as const;

export const PRESETS = {
  compact: {
    stripTrailingZero: true,
    spaceBetween: false,
    precision: 0
  } as const,
  accounting: {
    negativeFormat: 'parentheses' as const,
    symbolPosition: 'before' as const,
    precision: 2,
    stripTrailingZero: false
  } as const,
  international: {
    symbol: 'IDR',
    locale: 'en-US',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 2,
    stripTrailingZero: false
  } as const,
  noSymbol: {
    symbol: '',
    spaceBetween: false,
    precision: 0
  } as const,
  rounded: {
    precision: 0,
    stripTrailingZero: true
  } as const,
  standard: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
    symbolPosition: 'before' as const,
    spaceBetween: true,
    stripTrailingZero: false
  } as const,
  ecommerce: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 0,
    stripTrailingZero: true,
    spaceBetween: false,
    fallback: 'Gratis'
  } as const,
  financial: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
    stripTrailingZero: false,
    spaceBetween: true,
    negativeFormat: 'parentheses'
  } as const,
  mobile: {
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 0,
    stripTrailingZero: true,
    spaceBetween: false,
    symbolPosition: 'before' as const
  } as const,
  crypto: {
    symbol: '',
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
    stripTrailingZero: false,
    spaceBetween: false,
    symbolPosition: 'after' as const
  } as const
} as const;

---

//src/core/formatter.ts

import { RupiahFormatOptions, InputValue } from '../utils/types';
import { DEFAULT_OPTIONS, PRESETS } from './constants';
import { 
  toNumber, 
  formatNumber, 
  roundToPrecision,
  abbreviateNumber,
  calculatePercentageDifference
} from '../utils/helpers';
import { getLocaleConfig } from '../utils/locale';
import { RupiahValidator } from './validator';

export class RupiahFormatter {
  private options: RupiahFormatOptions;
  private aliasMap: Map<string, RupiahFormatOptions> = new Map();
  private formatCache: Map<string, string> = new Map();
  private static instanceCache: WeakMap<object, RupiahFormatter> = new WeakMap();
  private cacheSizeLimit = 1000;
  private cacheHits = 0;
  private cacheMisses = 0;
  private shouldSuppressWarnings = false;
  
  constructor(options: Partial<RupiahFormatOptions> = {}) {
    try {
      this.options = { ...DEFAULT_OPTIONS, ...options };
      RupiahValidator.validateOptions(this.options);
    } catch (error) {
      console.error('Formatter initialization error:', error);
      this.options = { ...DEFAULT_OPTIONS };
      throw new Error(`Failed to initialize RupiahFormatter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private formatNumberWithFractions(
    num: number,
    decimalSeparator: string,
    thousandSeparator: string,
    precision: number,
    minimumFractionDigits: number
  ): string {
    try {
      if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
        return '0';
      }
      
      return formatNumber(
        Math.abs(num),
        decimalSeparator,
        thousandSeparator,
        precision,
        minimumFractionDigits
      );
    } catch (error) {
      console.error('Error in formatNumberWithFractions:', error, 'num:', num);
      return '0';
    }
  }
  
  format(value: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    try {
      const validation = RupiahValidator.validateInput(value);
      if (!validation.isValid && !this.shouldSuppressWarnings) {
        console.warn('Invalid input value:', value, 'error:', validation.error);
      }
      
      const cacheKey = `${validation.numericValue}_${JSON.stringify(customOptions || this.options)}`;
      
      // Check cache
      if (this.formatCache.has(cacheKey)) {
        this.cacheHits++;
        return this.formatCache.get(cacheKey)!;
      }
      this.cacheMisses++;
      
      // Manage cache size
      if (this.formatCache.size >= this.cacheSizeLimit) {
        const firstKey = this.formatCache.keys().next().value;
        if (firstKey) {
          this.formatCache.delete(firstKey);
        }
      }
      
      const options = customOptions 
        ? { ...this.options, ...customOptions }
        : { ...this.options };
      
      const num = validation.numericValue;
      
      // Handle zero values
      if (num === 0 && options.hideZero && options.fallback) {
        this.formatCache.set(cacheKey, options.fallback);
        return options.fallback;
      }
      
      if (num === 0 && options.fallback) {
        this.formatCache.set(cacheKey, options.fallback);
        return options.fallback;
      }
      
      const localeConfig = getLocaleConfig(options.locale);
      const symbol = options.symbol || localeConfig.symbol;
      const decimalSeparator = options.decimalSeparator || localeConfig.decimalSeparator;
      const thousandSeparator = options.thousandSeparator || localeConfig.thousandSeparator;
      
      // Validate separators
      if (decimalSeparator === thousandSeparator) {
        throw new Error('Decimal and thousand separators cannot be the same');
      }
      
      let precision = options.precision ?? 2;
      
      if (options.minimumFractionDigits !== undefined) {
        precision = Math.max(precision, options.minimumFractionDigits);
      }
      if (options.maximumFractionDigits !== undefined) {
        precision = Math.min(precision, options.maximumFractionDigits);
      }
      
      const hasDecimal = num % 1 !== 0;
      let displayPrecision = precision;
      
      if (options.stripTrailingZero && !hasDecimal) {
        displayPrecision = 0;
      }
      
      const roundedNum = roundToPrecision(num, displayPrecision);
      const isNegative = roundedNum < 0;
      const absoluteNum = Math.abs(roundedNum);
      
      let formatted = this.formatNumberWithFractions(
        absoluteNum,
        decimalSeparator,
        thousandSeparator,
        displayPrecision,
        options.minimumFractionDigits || 0
      );
      
      // Clean up trailing zeros and decimal separator
      if (options.stripTrailingZero && decimalSeparator && formatted.includes(decimalSeparator)) {
        formatted = formatted.replace(new RegExp(`\\${decimalSeparator}?0+$`), '');
        if (formatted.endsWith(decimalSeparator)) {
          formatted = formatted.slice(0, -decimalSeparator.length);
        }
      }
      
      let result = formatted;
      
      // Handle symbol placement and negative formatting
      if (symbol && options.negativeFormat !== 'hidden') {
        const space = options.spaceBetween ? ' ' : '';
        
        if (isNegative && options.negativeFormat === 'parentheses') {
          result = options.symbolPosition === 'before'
            ? `${symbol}${space}(${formatted})`
            : `(${formatted})${space}${symbol}`;
        } else {
          const displaySymbol = isNegative && options.symbolPosition === 'before' 
            ? `-${symbol}` 
            : symbol;
          
          result = options.symbolPosition === 'before'
            ? `${displaySymbol}${space}${formatted}`
            : `${formatted}${space}${symbol}`;
          
          if (isNegative && options.symbolPosition === 'after') {
            result = `-${result}`;
          }
        }
      } else if (symbol && options.negativeFormat === 'hidden' && isNegative) {
        const space = options.spaceBetween ? ' ' : '';
        result = options.symbolPosition === 'before'
          ? `${symbol}${space}${formatted}`
          : `${formatted}${space}${symbol}`;
      } else {
        if (isNegative) {
          result = options.negativeFormat === 'parentheses' 
            ? `(${formatted})`
            : `-${formatted}`;
        }
      }
      
      this.formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error formatting value:', error, 'value:', value);
      return this.options.fallback || 'Rp 0';
    }
  }
  
  parse(formattedString: string): number {
    try {
      if (typeof formattedString !== 'string') {
        throw new Error('Input must be a string');
      }
      
      const parsed = toNumber(formattedString);
      if (isNaN(parsed)) {
        throw new Error('Failed to parse string to number');
      }
      return parsed;
    } catch (error) {
      console.error('Error parsing formatted string:', error, 'input:', formattedString);
      throw new Error(`Failed to parse Rupiah string: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  createAlias(name: string, options: Partial<RupiahFormatOptions>): void {
    try {
      if (!name || typeof name !== 'string') {
        throw new Error('Alias name must be a non-empty string');
      }
      
      if (this.aliasMap.has(name)) {
        throw new Error(`Alias "${name}" already exists`);
      }
      
      RupiahValidator.validateOptions(options);
      this.aliasMap.set(name, { ...this.options, ...options });
      this.clearCache();
    } catch (error) {
      console.error('Error creating alias:', error);
      throw new Error(`Failed to create alias: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  formatWithAlias(value: InputValue, alias: string): string {
    try {
      const aliasOptions = this.aliasMap.get(alias);
      if (!aliasOptions) {
        throw new Error(`Alias "${alias}" not found. Available aliases: ${Array.from(this.aliasMap.keys()).join(', ')}`);
      }
      return this.format(value, aliasOptions);
    } catch (error) {
      console.error('Error formatting with alias:', error);
      throw error;
    }
  }
  
  getAlias(name: string): RupiahFormatOptions | undefined {
    return this.aliasMap.get(name);
  }
  
  listAliases(): string[] {
    return Array.from(this.aliasMap.keys());
  }
  
  removeAlias(name: string): boolean {
    try {
      if (!this.aliasMap.has(name)) {
        return false;
      }
      
      const deleted = this.aliasMap.delete(name);
      if (deleted) {
        this.clearCache();
      }
      return deleted;
    } catch (error) {
      console.error('Error removing alias:', error);
      return false;
    }
  }
  
  usePreset(presetName: keyof typeof PRESETS): void {
    try {
      const preset = PRESETS[presetName];
      if (!preset) {
        throw new Error(`Preset "${presetName}" not found. Available presets: ${Object.keys(PRESETS).join(', ')}`);
      }
      this.options = { ...this.options, ...preset };
      RupiahValidator.validateOptions(this.options);
      this.clearCache();
    } catch (error) {
      console.error('Error using preset:', error);
      throw new Error(`Failed to use preset: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  updateOptions(newOptions: Partial<RupiahFormatOptions>): void {
    try {
      RupiahValidator.validateOptions(newOptions);
      this.options = { ...this.options, ...newOptions };
      this.clearCache();
    } catch (error) {
      console.error('Error updating options:', error);
      throw new Error(`Failed to update options: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  getOptions(): RupiahFormatOptions {
    return { ...this.options };
  }
  
  formatWithTemplate(value: InputValue, template: string): string {
    try {
      if (!template || typeof template !== 'string') {
        throw new Error('Template must be a non-empty string');
      }
      
      const formatted = this.format(value);
      return template.replace(/\{value\}/g, formatted);
    } catch (error) {
      console.error('Error formatting with template:', error);
      return this.options.fallback || 'Rp 0';
    }
  }
  
  formatRange(min: InputValue, max: InputValue, separator: string = ' - '): string {
    try {
      if (separator === undefined || separator === null) {
        separator = ' - ';
      }
      
      const minVal = RupiahValidator.sanitizeValue(min);
      const maxVal = RupiahValidator.sanitizeValue(max);
      
      if (minVal > maxVal) {
        console.warn('Minimum value is greater than maximum value in range formatting');
      }
      
      return `${this.format(min)}${separator}${this.format(max)}`;
    } catch (error) {
      console.error('Error formatting range:', error);
      return `${this.options.fallback}${separator}${this.options.fallback}`;
    }
  }
  
  formatWithAbbreviation(value: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    try {
      const num = RupiahValidator.sanitizeValue(value);
      const formatted = this.format(value, customOptions);
      const abbreviated = abbreviateNumber(num);
      return `${formatted} (≈${abbreviated})`;
    } catch (error) {
      console.error('Error formatting with abbreviation:', error);
      return this.format(value, customOptions);
    }
  }
  
  calculatePercentage(value: InputValue, total: InputValue, customOptions?: Partial<RupiahFormatOptions>): string {
    try {
      const val = RupiahValidator.sanitizeValue(value);
      const tot = RupiahValidator.sanitizeValue(total);
      
      if (tot === 0) {
        return `${this.format(value, customOptions)} (0%)`;
      }
      
      const formattedValue = this.format(value, customOptions);
      const percentage = (val / tot) * 100;
      return `${formattedValue} (${percentage.toFixed(1)}%)`;
    } catch (error) {
      console.error('Error calculating percentage:', error);
      return this.format(value, customOptions);
    }
  }
  
  calculateGrowth(oldValue: InputValue, newValue: InputValue): string {
    try {
      const old = RupiahValidator.sanitizeValue(oldValue);
      const newVal = RupiahValidator.sanitizeValue(newValue);
      
      if (old === 0 && newVal === 0) {
        return `${this.format(old)} → ${this.format(newVal)} (0%)`;
      }
      
      const percentage = calculatePercentageDifference(old, newVal);
      const formattedOld = this.format(old);
      const formattedNew = this.format(newVal);
      
      const sign = percentage >= 0 ? '+' : '';
      return `${formattedOld} → ${formattedNew} (${sign}${percentage.toFixed(1)}%)`;
    } catch (error) {
      console.error('Error calculating growth:', error);
      return `${this.format(oldValue)} → ${this.format(newValue)}`;
    }
  }
  
  clearCache(): void {
    this.formatCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
  
  getCacheStats(): { hits: number; misses: number; size: number; hitRate: number } {
    const total = this.cacheHits + this.cacheMisses;
    const hitRate = total > 0 ? (this.cacheHits / total) * 100 : 0;
    
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      size: this.formatCache.size,
      hitRate: parseFloat(hitRate.toFixed(2))
    };
  }
  
  setCacheSizeLimit(limit: number): void {
    if (limit < 1) {
      throw new Error('Cache size limit must be at least 1');
    }
    this.cacheSizeLimit = limit;
    
    // Trim cache if it exceeds new limit
    while (this.formatCache.size > this.cacheSizeLimit) {
      const firstKey = this.formatCache.keys().next().value;
      if (firstKey) {
        this.formatCache.delete(firstKey);
      }
    }
  }
  
  suppressWarnings(suppress: boolean): void {
    this.shouldSuppressWarnings = suppress;
  }
  
  static format(value: InputValue, options?: Partial<RupiahFormatOptions>): string {
    try {
      const formatter = new RupiahFormatter(options);
      return formatter.format(value);
    } catch (error) {
      console.error('Error in static format:', error);
      return DEFAULT_OPTIONS.fallback;
    }
  }
  
  static parse(formattedString: string): number {
    try {
      return toNumber(formattedString);
    } catch (error) {
      console.error('Error in static parse:', error);
      return 0;
    }
  }
  
  static create(options?: Partial<RupiahFormatOptions>): RupiahFormatter {
    try {
      return new RupiahFormatter(options);
    } catch (error) {
      console.error('Error creating formatter:', error);
      return new RupiahFormatter();
    }
  }
  
  static getInstance(key: object, options?: Partial<RupiahFormatOptions>): RupiahFormatter {
    if (!key || typeof key !== 'object') {
      throw new Error('Key must be an object');
    }
    
    if (!RupiahFormatter.instanceCache.has(key)) {
      RupiahFormatter.instanceCache.set(key, new RupiahFormatter(options));
    }
    return RupiahFormatter.instanceCache.get(key)!;
  }
  
  static removeInstance(key: object): boolean {
    return RupiahFormatter.instanceCache.delete(key);
  }
}

---

//src/core/validator.ts

import { RupiahFormatOptions } from '../utils/types';
import { DEFAULT_OPTIONS } from './constants';
import { toNumber } from '../utils/helpers';

export class RupiahValidator {
  static validateOptions(options: Partial<RupiahFormatOptions>): void {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    if (opts.precision < 0 || opts.precision > 20) {
      throw new Error('Precision must be between 0 and 20');
    }
    
    if (opts.decimalSeparator === opts.thousandSeparator) {
      throw new Error('Decimal and thousand separators must be different');
    }
    
    if (opts.minimumFractionDigits !== undefined && 
        opts.maximumFractionDigits !== undefined &&
        opts.minimumFractionDigits > opts.maximumFractionDigits) {
      throw new Error('Minimum fraction digits cannot be greater than maximum');
    }
    
    if (opts.minimumFractionDigits !== undefined && 
        (opts.minimumFractionDigits < 0 || opts.minimumFractionDigits > 20)) {
      throw new Error('Minimum fraction digits must be between 0 and 20');
    }
    
    if (opts.maximumFractionDigits !== undefined && 
        (opts.maximumFractionDigits < 0 || opts.maximumFractionDigits > 20)) {
      throw new Error('Maximum fraction digits must be between 0 and 20');
    }
    
    if (!['before', 'after'].includes(opts.symbolPosition || '')) {
      throw new Error('Symbol position must be "before" or "after"');
    }
    
    if (!['sign', 'parentheses', 'hidden'].includes(opts.negativeFormat || '')) {
      throw new Error('Negative format must be "sign", "parentheses", or "hidden"');
    }
    
    if (opts.formatStyle && !['standard', 'compact', 'accounting'].includes(opts.formatStyle)) {
      throw new Error('Format style must be "standard", "compact", or "accounting"');
    }
  }
  
  static sanitizeValue(value: unknown): number {
    try {
      return toNumber(value as any);
    } catch (error) {
      console.error('Error sanitizing value:', error, 'value:', value);
      return 0;
    }
  }
  
  static validateCurrencyCode(code: string): boolean {
    return /^[A-Z]{3}$/.test(code);
  }
  
  static validateInput(value: unknown): { isValid: boolean; error?: string; numericValue: number } {
    try {
      const numericValue = this.sanitizeValue(value);
      
      if (typeof value === 'string') {
        const cleaned = value.trim();
        if (cleaned === '') {
          return { isValid: true, numericValue: 0 };
        }
        
        // Common Rupiah patterns
        const rupiahPatterns = [
          /^(Rp\s*)?-?\s*\d{1,3}(\.\d{3})*(,\d{1,2})?$/,  // Rp 1.000,00
          /^(IDR\s*)?-?\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$/, // IDR 1,000.00
          /^-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,             // 1.000,00
          /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,             // 1,000.00
          /^-?\d+(\.\d{1,2})?$/,                          // 1000.00
          /^-?\d+(,\d{1,2})?$/                            // 1000,00
        ];
        
        // Check if it's a valid number format
        let isValid = false;
        for (const pattern of rupiahPatterns) {
          if (pattern.test(cleaned)) {
            isValid = true;
            break;
          }
        }
        
        // Also accept plain numbers
        if (!isValid && /^-?\d+$/.test(cleaned.replace(/[^\d-]/g, ''))) {
          isValid = true;
        }
        
        return { 
          isValid, 
          error: isValid ? undefined : 'Invalid number format', 
          numericValue 
        };
      }
      
      return { isValid: true, numericValue };
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Unknown error', 
        numericValue: 0 
      };
    }
  }
}

---

//src/hooks/useRupiah.ts

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { RupiahFormatter } from '../core/formatter';
import { RupiahFormatOptions, InputValue } from '../utils/types';

export const useRupiah = (initialOptions?: Partial<RupiahFormatOptions>) => {
  const formatterRef = useRef<RupiahFormatter | null>(null);
  const [options, setOptions] = useState(initialOptions || {});
  
  const getFormatter = useCallback(() => {
    if (!formatterRef.current) {
      try {
        formatterRef.current = new RupiahFormatter(initialOptions);
      } catch (error) {
        console.error('Error creating RupiahFormatter:', error);
        formatterRef.current = new RupiahFormatter();
      }
    }
    return formatterRef.current;
  }, [initialOptions]);
  
  const format = useCallback((value: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
    try {
      const formatter = getFormatter();
      const mergedOptions = customOptions ? { ...options, ...customOptions } : options;
      return formatter.format(value, mergedOptions);
    } catch (error) {
      console.error('Error in format hook:', error, 'value:', value);
      return initialOptions?.fallback || 'Rp 0';
    }
  }, [getFormatter, options, initialOptions?.fallback]);
  
  const parse = useCallback((formattedString: string) => {
    try {
      const formatter = getFormatter();
      return formatter.parse(formattedString);
    } catch (error) {
      console.error('Error in parse hook:', error);
      return 0;
    }
  }, [getFormatter]);
  
  const updateOptions = useCallback((newOptions: Partial<RupiahFormatOptions>) => {
    try {
      setOptions(prev => ({ ...prev, ...newOptions }));
      const formatter = getFormatter();
      formatter.updateOptions(newOptions);
    } catch (error) {
      console.error('Error updating options in hook:', error);
      throw error;
    }
  }, [getFormatter]);
  
  const createAlias = useCallback((name: string, aliasOptions: Partial<RupiahFormatOptions>) => {
    try {
      const formatter = getFormatter();
      formatter.createAlias(name, aliasOptions);
    } catch (error) {
      console.error('Error creating alias in hook:', error);
      throw error;
    }
  }, [getFormatter]);
  
  const formatWithAlias = useCallback((value: InputValue, alias: string) => {
    try {
      const formatter = getFormatter();
      return formatter.formatWithAlias(value, alias);
    } catch (error) {
      console.error('Error formatting with alias in hook:', error);
      throw error;
    }
  }, [getFormatter]);
  
  const memoizedFormatter = useMemo(() => {
    const formatter = getFormatter();
    return {
      format,
      parse,
      updateOptions,
      createAlias,
      formatWithAlias,
      getOptions: () => formatter.getOptions(),
      formatWithTemplate: (value: InputValue, template: string) => {
        try {
          return formatter.formatWithTemplate(value, template);
        } catch (error) {
          console.error('Error formatting with template in hook:', error);
          return initialOptions?.fallback || 'Rp 0';
        }
      },
      formatRange: (min: InputValue, max: InputValue, separator?: string) => {
        try {
          return formatter.formatRange(min, max, separator);
        } catch (error) {
          console.error('Error formatting range in hook:', error);
          return `${initialOptions?.fallback || 'Rp 0'} - ${initialOptions?.fallback || 'Rp 0'}`;
        }
      },
      formatWithAbbreviation: (value: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
        try {
          return formatter.formatWithAbbreviation(value, customOptions);
        } catch (error) {
          console.error('Error formatting with abbreviation in hook:', error);
          return format(value, customOptions);
        }
      },
      calculatePercentage: (value: InputValue, total: InputValue, customOptions?: Partial<RupiahFormatOptions>) => {
        try {
          return formatter.calculatePercentage(value, total, customOptions);
        } catch (error) {
          console.error('Error calculating percentage in hook:', error);
          return format(value, customOptions);
        }
      },
      calculateGrowth: (oldValue: InputValue, newValue: InputValue) => {
        try {
          return formatter.calculateGrowth(oldValue, newValue);
        } catch (error) {
          console.error('Error calculating growth in hook:', error);
          return `${format(oldValue)} → ${format(newValue)}`;
        }
      },
      clearCache: () => formatter.clearCache(),
      getCacheStats: () => formatter.getCacheStats()
    };
  }, [format, parse, updateOptions, createAlias, formatWithAlias, getFormatter, initialOptions?.fallback]);
  
  useEffect(() => {
    return () => {
      if (formatterRef.current) {
        formatterRef.current.clearCache();
      }
    };
  }, []);
  
  return memoizedFormatter;
};

export const useRupiahFormat = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  const formatter = useRupiah(options);
  return formatter.format(value);
};

export const useRupiahState = (initialValue: InputValue = 0, options?: Partial<RupiahFormatOptions>) => {
  const [value, setValue] = useState(initialValue);
  const { format } = useRupiah(options);
  
  const formatted = useMemo(() => format(value), [format, value]);
  
  return {
    value,
    formatted,
    setValue,
    updateValue: setValue
  };
};

export const useRupiahInput = (
  initialValue: InputValue = 0, 
  options?: Partial<RupiahFormatOptions>,
  onChange?: (value: number) => void
) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const { format, parse } = useRupiah(options);
  const lastValidValue = useRef<number>(0);
  
  useEffect(() => {
    if (!isFocused) {
      try {
        const num = parse(initialValue.toString());
        lastValidValue.current = num;
        setInputValue(format(num));
      } catch (error) {
        console.error('Error formatting initial value:', error);
        setInputValue(format(0));
      }
    }
  }, [initialValue, format, parse, isFocused]);
  
  const numericValue = useMemo(() => {
    try {
      return inputValue ? parse(inputValue) : 0;
    } catch {
      return lastValidValue.current;
    }
  }, [inputValue, parse]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleaned = rawValue.replace(/[^\d.,-]/g, '');
    setInputValue(cleaned);
    
    try {
      const num = parse(cleaned);
      lastValidValue.current = num;
      onChange?.(num);
    } catch {
      onChange?.(lastValidValue.current);
    }
  }, [parse, onChange]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    const cleaned = inputValue.replace(/[^\d.,-]/g, '');
    setInputValue(cleaned);
  }, [inputValue]);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    try {
      if (numericValue !== 0) {
        setInputValue(format(numericValue));
      } else {
        setInputValue('');
      }
    } catch (error) {
      console.error('Error formatting on blur:', error);
      setInputValue(format(lastValidValue.current));
    }
  }, [format, numericValue]);
  
  return {
    inputValue,
    numericValue,
    formattedValue: format(numericValue),
    handleChange,
    handleFocus,
    handleBlur,
    setInputValue: (value: string) => {
      setInputValue(value);
      try {
        const num = parse(value);
        lastValidValue.current = num;
        onChange?.(num);
      } catch {
        onChange?.(lastValidValue.current);
      }
    }
  };
};

---

//src/index.ts

// Core exports
import { RupiahFormatter } from './core/formatter';
import { RupiahValidator } from './core/validator';
import { DEFAULT_OPTIONS, PRESETS } from './core/constants';

// Parser exports
import { RupiahParser } from './parse/parser';
import { RupiahSanitizer } from './parse/sanitizer';

// Utils exports
import { 
  isNumeric, 
  toNumber, 
  formatNumber, 
  roundToPrecision,
  generateAlias,
  abbreviateNumber,
  calculatePercentageDifference
} from './utils/helpers';

import { 
  LOCALE_CONFIGS, 
  getLocaleConfig, 
  detectLocale 
} from './utils/locale';

// Types
import type {
  RupiahFormatOptions,
  ParsedRupiah,
  CurrencyLocale,
  RupiahFormatterConfig,
  InputValue,
  SeparatorPattern,
  SymbolPosition,
  NegativeFormat,
  FormatStyle
} from './utils/types';

// Convenience functions with enhanced error handling
export const formatRupiah = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  try {
    if (value === undefined || value === null) {
      return options?.fallback || DEFAULT_OPTIONS.fallback;
    }
    
    const validation = RupiahValidator.validateInput(value);
    if (!validation.isValid) {
      // Suppress warning for common cases
      if (typeof value === 'string' && value.trim() !== '') {
        console.warn('Invalid value passed to formatRupiah:', value);
      }
    }
    
    // Use instance method instead of static method
    const formatter = new RupiahFormatter(options);
    return formatter.format(validation.numericValue);
  } catch (error) {
    console.error('Error in formatRupiah:', error, 'value:', value);
    return options?.fallback || DEFAULT_OPTIONS.fallback;
  }
};

export const parseRupiah = (formattedString: string): number => {
  try {
    if (typeof formattedString !== 'string') {
      throw new Error('Input must be a string');
    }
    
    const trimmed = formattedString.trim();
    if (!trimmed) {
      return 0;
    }
    
    return RupiahParser.extractNumber(trimmed);
  } catch (error) {
    console.error('Error in parseRupiah:', error, 'input:', formattedString);
    return 0;
  }
};

export const isValidRupiah = (formattedString: string): boolean => {
  try {
    if (typeof formattedString !== 'string') {
      return false;
    }
    
    const trimmed = formattedString.trim();
    if (!trimmed) {
      return false;
    }
    
    return RupiahParser.isValidRupiah(trimmed);
  } catch (error) {
    console.error('Error in isValidRupiah:', error);
    return false;
  }
};

export const formatRupiahWithAbbreviation = (
  value: InputValue,
  options?: Partial<RupiahFormatOptions>
): string => {
  try {
    const validation = RupiahValidator.validateInput(value);
    if (!validation.isValid) {
      console.warn('Invalid value passed to formatRupiahWithAbbreviation:', value);
    }
    
    const formatter = new RupiahFormatter(options);
    return formatter.formatWithAbbreviation(validation.numericValue);
  } catch (error) {
    console.error('Error in formatRupiahWithAbbreviation:', error);
    return formatRupiah(value, options);
  }
};

export const formatRupiahRange = (
  min: InputValue,
  max: InputValue,
  options?: Partial<RupiahFormatOptions>,
  separator: string = ' - '
): string => {
  try {
    const formatter = new RupiahFormatter(options);
    return formatter.formatRange(min, max, separator);
  } catch (error) {
    console.error('Error in formatRupiahRange:', error);
    const fallback = options?.fallback || DEFAULT_OPTIONS.fallback;
    return `${fallback}${separator}${fallback}`;
  }
};

export const formatRupiahWithTemplate = (
  value: InputValue,
  template: string,
  options?: Partial<RupiahFormatOptions>
): string => {
  try {
    const formatter = new RupiahFormatter(options);
    return formatter.formatWithTemplate(value, template);
  } catch (error) {
    console.error('Error in formatRupiahWithTemplate:', error);
    return options?.fallback || DEFAULT_OPTIONS.fallback;
  }
};

// Named exports
export { 
  RupiahFormatter,
  RupiahValidator,
  RupiahParser,
  RupiahSanitizer
};

export { 
  DEFAULT_OPTIONS,
  PRESETS,
  LOCALE_CONFIGS,
  getLocaleConfig,
  detectLocale,
  isNumeric,
  toNumber,
  formatNumber,
  roundToPrecision,
  generateAlias,
  abbreviateNumber,
  calculatePercentageDifference
};

export type {
  RupiahFormatOptions,
  ParsedRupiah,
  CurrencyLocale,
  RupiahFormatterConfig,
  InputValue,
  SeparatorPattern,
  SymbolPosition,
  NegativeFormat,
  FormatStyle
};

// Default export for easy importing
const Rupiah = {
  format: formatRupiah,
  parse: parseRupiah,
  isValid: isValidRupiah,
  formatWithAbbreviation: formatRupiahWithAbbreviation,
  formatRange: formatRupiahRange,
  formatWithTemplate: formatRupiahWithTemplate,
  Formatter: RupiahFormatter,
  Parser: RupiahParser,
  Validator: RupiahValidator,
  Sanitizer: RupiahSanitizer,
  presets: PRESETS,
  constants: DEFAULT_OPTIONS,
  locales: LOCALE_CONFIGS,
  helpers: {
    isNumeric,
    toNumber,
    formatNumber,
    roundToPrecision,
    generateAlias,
    abbreviateNumber,
    calculatePercentageDifference,
    getLocaleConfig,
    detectLocale
  }
};

export default Rupiah;

---

//src/parse/parser.ts

import { ParsedRupiah } from '../utils/types';
import { getLocaleConfig } from '../utils/locale';
import { toNumber } from '../utils/helpers';

export class RupiahParser {
  static parse(formattedString: string, locale: string = 'id-ID'): ParsedRupiah {
    const localeConfig = getLocaleConfig(locale);
    
    // Clean the string
    let cleaned = formattedString.trim();
    
    // Remove currency symbol
    const symbolRegex = new RegExp(
      `\\s*${localeConfig.symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`,
      'gi'
    );
    cleaned = cleaned.replace(symbolRegex, '');
    
    // For parsing, we just use the toNumber function which handles all formats
    const numeric = toNumber(cleaned);
    const isValid = !isNaN(numeric) && isFinite(numeric);
    
    return {
      raw: formattedString,
      numeric: isValid ? numeric : 0,
      isValid,
      currency: localeConfig.currency,
      locale: localeConfig.locale
    };
  }
  
  static extractNumber(formattedString: string): number {
    const parsed = this.parse(formattedString);
    return parsed.numeric;
  }
  
  static isValidRupiah(formattedString: string): boolean {
    // Strict validation for Rupiah format
    if (typeof formattedString !== 'string') return false;
    
    const trimmed = formattedString.trim();
    if (!trimmed) return false;
    
    // Check if it contains at least one digit
    if (!/\d/.test(trimmed)) return false;
    
    // Common Rupiah patterns
    const rupiahPatterns = [
      // Rp 1.000, Rp 1.000,00, Rp -1.000
      /^(Rp\s*)?-?\s*\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // IDR 1,000.00
      /^(IDR\s*)?-?\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      // Rp1.000 (no space)
      /^Rp-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      // Plain numbers
      /^-?\d{1,3}(\.\d{3})*(,\d{1,2})?$/,
      /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
      /^-?\d+(\.\d{1,2})?$/,
      /^-?\d+(,\d{1,2})?$/
    ];
    
    // Check against patterns
    for (const pattern of rupiahPatterns) {
      if (pattern.test(trimmed)) {
        return true;
      }
    }
    
    return false;
  }
  
  static detectLocale(formattedString: string): string {
    const locales = ['id-ID', 'en-US', 'de-DE', 'fr-FR'];
    
    for (const locale of locales) {
      const localeConfig = getLocaleConfig(locale);
      if (formattedString.includes(localeConfig.symbol)) {
        return locale;
      }
    }
    
    return 'id-ID';
  }
}

---

//src/parse/sanitizer.ts

export class RupiahSanitizer {
  static sanitizeInput(input: unknown): string {
    if (input == null) return '0';
    
    if (typeof input === 'number') {
      return input.toString();
    }
    
    if (typeof input === 'string') {
      return input.trim();
    }
    
    if (typeof input === 'bigint') {
      return input.toString();
    }
    
    return String(input);
  }
  
  static removeFormatting(formattedString: string): string {
    // Remove common currency formatting
    return formattedString
      .replace(/[^\d.,-]/g, '')  // Remove non-numeric except .,-
      .replace(/\./g, '')        // Remove thousand separators
      .replace(',', '.');        // Convert decimal comma to dot
  }
  
  static normalizeDecimal(input: string, decimalSeparator: string = ','): string {
    if (decimalSeparator === ',') {
      return input.replace('.', '').replace(',', '.');
    }
    return input.replace(',', '').replace('.', decimalSeparator);
  }
  
  static escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

---

//src/react/index.tsx

import React from 'react';
import type { InputValue, RupiahFormatOptions } from '../utils/types';
import { useRupiah, useRupiahFormat, useRupiahState, useRupiahInput } from '../hooks/useRupiah';
import { RupiahDisplay, MemoizedRupiahDisplay, type RupiahDisplayProps } from './RupiahDisplay';

// Export type untuk RupiahDisplayProps
export type { RupiahDisplayProps };

// React convenience component
export const Rupiah: React.FC<{
  value: InputValue;
  options?: Partial<RupiahFormatOptions>;
  className?: string;
}> = ({ value, options, className }) => {
  return React.createElement(
    RupiahDisplay,
    {
      value,
      className,
      ...options
    }
  );
};

export { useRupiah, useRupiahFormat, useRupiahState, useRupiahInput, RupiahDisplay, MemoizedRupiahDisplay };

---

//src/react/RupiahDisplay.tsx

import React from 'react';
import { RupiahFormatter } from '../core/formatter';
import { RupiahFormatOptions, InputValue } from '../utils/types';

// Extend RupiahFormatOptions but override fallback to accept ReactNode
interface RupiahDisplayProps extends Omit<RupiahFormatOptions, 'fallback'> {
  value: InputValue;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  'data-testid'?: string;
  fallback?: React.ReactNode; // Override to accept ReactNode
  onFormatError?: (error: Error) => void;
  onFormatSuccess?: (formattedValue: string) => void;
  withAbbreviation?: boolean;
  withPercentage?: {
    total: number;
    customOptions?: Partial<RupiahFormatOptions>;
  };
  withGrowth?: {
    oldValue: InputValue;
    showArrow?: boolean;
  };
  component?: React.ElementType;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

interface RupiahDisplayState {
  formatted: string;
  error: Error | null;
  isLoading: boolean;
}

export class RupiahDisplay extends React.Component<RupiahDisplayProps, RupiahDisplayState> {
  private formatter: RupiahFormatter;
  
  constructor(props: RupiahDisplayProps) {
    super(props);
    
    // Inisialisasi state terlebih dahulu
    this.state = {
      formatted: '',
      error: null,
      isLoading: true
    };
    
    try {
      this.formatter = new RupiahFormatter({
        symbol: props.symbol,
        decimalSeparator: props.decimalSeparator,
        thousandSeparator: props.thousandSeparator,
        precision: props.precision,
        symbolPosition: props.symbolPosition,
        spaceBetween: props.spaceBetween,
        stripTrailingZero: props.stripTrailingZero,
        negativeFormat: props.negativeFormat,
        hideZero: props.hideZero,
        fallback: typeof props.fallback === 'string' ? props.fallback : 'Rp 0',
        locale: props.locale,
        currencyCode: props.currencyCode,
        minimumFractionDigits: props.minimumFractionDigits,
        maximumFractionDigits: props.maximumFractionDigits,
        formatStyle: props.formatStyle
      });
    } catch (error) {
      console.error('Error creating RupiahFormatter:', error);
      this.formatter = new RupiahFormatter();
      this.setState({
        error: error instanceof Error ? error : new Error('Failed to create formatter')
      });
    }
  }
  
  componentDidMount() {
    this.formatValue();
  }
  
  componentDidUpdate(prevProps: RupiahDisplayProps) {
    const propsToCheck: (keyof RupiahDisplayProps)[] = [
      'value', 'symbol', 'decimalSeparator', 'thousandSeparator',
      'precision', 'symbolPosition', 'spaceBetween', 'stripTrailingZero',
      'negativeFormat', 'hideZero', 'locale', 'withAbbreviation'
    ];
    
    const hasChanged = propsToCheck.some(prop => 
      this.props[prop] !== prevProps[prop]
    );
    
    const percentageChanged = JSON.stringify(this.props.withPercentage) !== JSON.stringify(prevProps.withPercentage);
    const growthChanged = JSON.stringify(this.props.withGrowth) !== JSON.stringify(prevProps.withGrowth);
    
    if (hasChanged || percentageChanged || growthChanged) {
      this.formatValue();
    }
  }
  
  private formatValue() {
    this.setState({ isLoading: true, error: null });
    
    try {
      const {
        value,
        withAbbreviation,
        withPercentage,
        withGrowth
      } = this.props;
      
      let result = this.formatter.format(value);
      
      if (withAbbreviation) {
        result = this.formatter.formatWithAbbreviation(value);
      }
      
      if (withPercentage) {
        result = this.formatter.calculatePercentage(value, withPercentage.total, withPercentage.customOptions);
      }
      
      if (withGrowth) {
        const growthResult = this.formatter.calculateGrowth(withGrowth.oldValue, value);
        if (withGrowth.showArrow) {
          result = `${this.formatter.format(withGrowth.oldValue)} → ${result}`;
        } else {
          result = growthResult;
        }
      }
      
      this.setState({ formatted: result, isLoading: false });
      this.props.onFormatSuccess?.(result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Formatting error');
      console.error('Error formatting value in RupiahDisplay:', error);
      this.setState({ error: err, isLoading: false });
      this.props.onFormatError?.(err);
    }
  }
  
  render() {
    const {
      className,
      style,
      title,
      'data-testid': testId,
      fallback = 'Rp 0',
      component: Component = 'span',
      loadingComponent,
      errorComponent,
      ...props
    } = this.props;
    
    const { formatted, error, isLoading } = this.state;
    
    if (isLoading && loadingComponent) {
      return React.createElement(React.Fragment, null, loadingComponent);
    }
    
    if (error) {
      if (errorComponent) {
        return React.createElement(React.Fragment, null, errorComponent);
      }
      
      return React.createElement(
        Component,
        {
          className: `rupiah-error ${className || ''}`,
          style,
          title,
          'data-testid': testId ? `${testId}-error` : undefined,
          ...props
        },
        typeof fallback === 'string' ? fallback : fallback
      );
    }
    
    return React.createElement(
      Component,
      {
        className: `rupiah-display ${className || ''}`,
        style,
        title,
        'data-testid': testId,
        ...props
      },
      formatted
    );
  }
}

export const MemoizedRupiahDisplay = React.memo(RupiahDisplay, (prevProps, nextProps) => {
  const propsToCheck = [
    'value', 'symbol', 'decimalSeparator', 'thousandSeparator',
    'precision', 'stripTrailingZero', 'hideZero', 'withAbbreviation'
  ];
  
  for (const prop of propsToCheck) {
    if (prevProps[prop as keyof RupiahDisplayProps] !== nextProps[prop as keyof RupiahDisplayProps]) {
      return false;
    }
  }
  
  if (JSON.stringify(prevProps.withPercentage) !== JSON.stringify(nextProps.withPercentage)) {
    return false;
  }
  
  if (JSON.stringify(prevProps.withGrowth) !== JSON.stringify(nextProps.withGrowth)) {
    return false;
  }
  
  return true;
});

// Export type untuk digunakan di file lain
export type { RupiahDisplayProps };

---

//src/utils/helpers.ts

import { InputValue } from './types';

export const isNumeric = (value: unknown): boolean => {
  if (typeof value === 'number' || typeof value === 'bigint') return true;
  if (typeof value !== 'string') return false;
  
  const cleaned = value
    .replace(/[^\d.,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  return !isNaN(parseFloat(cleaned)) && isFinite(parseFloat(cleaned));
};

export const toNumber = (value: InputValue): number => {
  if (typeof value === 'number') {
    return isNaN(value) || !isFinite(value) ? 0 : value;
  }
  
  if (typeof value === 'bigint') {
    return Number(value);
  }
  
  if (typeof value === 'string') {
    // Fungsi khusus untuk parsing string Rupiah
    return parseRupiahString(value);
  }
  
  // Try to convert any other type to number
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

// Helper function khusus untuk parsing string Rupiah
function parseRupiahString(value: string): number {
  if (!value || typeof value !== 'string') return 0;
  
  const trimmed = value.trim();
  if (trimmed === '') return 0;
  
  // Handle boolean strings
  if (trimmed.toLowerCase() === 'true') return 1;
  if (trimmed.toLowerCase() === 'false') return 0;
  
  // Hapus semua karakter non-numeric kecuali titik, koma, dan minus
  let cleaned = trimmed.replace(/[^\d.,-]/g, '');
  
  // Jika tidak ada angka, return 0
  if (cleaned === '' || cleaned === '-' || cleaned === '.' || cleaned === ',') {
    return 0;
  }
  
  // Tentukan apakah negatif
  const isNegative = cleaned.startsWith('-');
  if (isNegative) {
    cleaned = cleaned.substring(1);
  }
  
  // Logika parsing untuk format Rupiah
  // Format Indonesia: 1.234.567,89 (titik ribuan, koma desimal)
  // Format Internasional: 1,234,567.89 (koma ribuan, titik desimal)
  
  // Hitung jumlah titik dan koma
  const dotCount = (cleaned.match(/\./g) || []).length;
  const commaCount = (cleaned.match(/,/g) || []).length;
  
  let result: number;
  
  if (dotCount > 0 && commaCount > 0) {
    // Ada kedua-duanya
    const lastDotIndex = cleaned.lastIndexOf('.');
    const lastCommaIndex = cleaned.lastIndexOf(',');
    
    if (lastDotIndex > lastCommaIndex) {
      // Titik adalah pemisah desimal terakhir (format internasional)
      // Contoh: 1,234,567.89
      result = parseFloat(
        cleaned
          .replace(/,/g, '')  // Hapus koma (ribuan)
      );
    } else {
      // Koma adalah pemisah desimal terakhir (format Indonesia)
      // Contoh: 1.234.567,89
      result = parseFloat(
        cleaned
          .replace(/\./g, '')  // Hapus titik (ribuan)
          .replace(',', '.')   // Ganti koma dengan titik
      );
    }
  } else if (dotCount > 1) {
    // Hanya ada titik dan lebih dari satu (format Indonesia tanpa desimal)
    // Contoh: 1.234.567
    result = parseFloat(cleaned.replace(/\./g, ''));
  } else if (commaCount > 1) {
    // Hanya ada koma dan lebih dari satu (format internasional tanpa desimal)
    // Contoh: 1,234,567
    result = parseFloat(cleaned.replace(/,/g, ''));
  } else if (dotCount === 1) {
    // Hanya satu titik - bisa jadi desimal atau ribuan
    const parts = cleaned.split('.');
    if (parts[1].length === 2 || parts[1].length === 3) {
      // Panjang bagian desimal 2 atau 3 digit, mungkin uang
      // Coba format Indonesia dulu
      if (parts[0].length <= 3) {
        // Format: 1.000 (ribuan Indonesia)
        result = parseFloat(parts[0] + parts[1]);
      } else {
        // Format: 1000.00 (desimal internasional)
        result = parseFloat(cleaned);
      }
    } else {
      // Asumsi format internasional dengan desimal
      result = parseFloat(cleaned);
    }
  } else if (commaCount === 1) {
    // Hanya satu koma - bisa jadi desimal atau ribuan
    const parts = cleaned.split(',');
    if (parts[1].length === 2 || parts[1].length === 3) {
      // Panjang bagian desimal 2 atau 3 digit, mungkin uang
      // Coba format Indonesia
      if (parts[0].length <= 3) {
        // Format: 1,000 (ribuan internasional)
        result = parseFloat(parts[0] + parts[1]);
      } else {
        // Format: 1000,00 (desimal Indonesia)
        result = parseFloat(parts[0] + '.' + parts[1]);
      }
    } else {
      // Asumsi format Indonesia dengan desimal
      result = parseFloat(parts[0] + '.' + parts[1]);
    }
  } else {
    // Tidak ada titik atau koma
    result = parseFloat(cleaned);
  }
  
  result = isNaN(result) ? 0 : result;
  return isNegative ? -result : result;
}

export const roundToPrecision = (num: number, precision: number): number => {
  if (precision === 0) return Math.round(num);
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
};

export const formatNumber = (
  num: number,
  decimalSeparator: string = ',',
  thousandSeparator: string = '.',
  precision: number = 2,
  minimumFractionDigits: number = 0
): string => {
  try {
    const fixedNum = Math.abs(num).toFixed(precision);
    const [integer, decimal] = fixedNum.split('.');
    
    // Format integer part with thousand separators
    const formattedInteger = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );
    
    if (!decimal && minimumFractionDigits <= 0) {
      return formattedInteger;
    }
    
    let formattedDecimal = decimal || '';
    if (minimumFractionDigits > 0) {
      formattedDecimal = (decimal || '').padEnd(minimumFractionDigits, '0');
    }
    
    return `${formattedInteger}${decimalSeparator}${formattedDecimal}`;
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};

export const generateAlias = (options: Record<string, unknown>): string => {
  return `rp_${Object.values(options).join('_')}`.replace(/[^a-zA-Z0-9_]/g, '');
};

export const abbreviateNumber = (num: number, precision: number = 1): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1e12) return `${(num / 1e12).toFixed(precision)}T`;
  if (absNum >= 1e9) return `${(num / 1e9).toFixed(precision)}B`;
  if (absNum >= 1e6) return `${(num / 1e6).toFixed(precision)}M`;
  if (absNum >= 1e3) return `${(num / 1e3).toFixed(precision)}K`;
  return num.toString();
};

export const calculatePercentageDifference = (
  oldValue: number,
  newValue: number
): number => {
  if (oldValue === 0) return newValue > 0 ? 100 : newValue < 0 ? -100 : 0;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
};

---

//src/utils/locale.ts

import { CurrencyLocale } from './types';

export const LOCALE_CONFIGS: Record<string, CurrencyLocale> = {
  'id-ID': {
    locale: 'id-ID',
    currency: 'IDR',
    symbol: 'Rp',
    decimalSeparator: ',',
    thousandSeparator: '.'
  },
  'en-US': {
    locale: 'en-US',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: '.',
    thousandSeparator: ','
  },
  'en-GB': {
    locale: 'en-GB',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: '.',
    thousandSeparator: ','
  },
  'de-DE': {
    locale: 'de-DE',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: ',',
    thousandSeparator: '.'
  },
  'fr-FR': {
    locale: 'fr-FR',
    currency: 'IDR',
    symbol: 'IDR',
    decimalSeparator: ',',
    thousandSeparator: ' '
  }
};

export const getLocaleConfig = (locale: string = 'id-ID'): CurrencyLocale => {
  return LOCALE_CONFIGS[locale] || LOCALE_CONFIGS['id-ID'];
};

export const detectLocale = (): string => {
  if (typeof navigator !== 'undefined') {
    return navigator.language;
  }
  return 'id-ID';
};

---

//src/utils/types.ts

export type SymbolPosition = 'before' | 'after';
export type NegativeFormat = 'sign' | 'parentheses' | 'hidden';
export type FormatStyle = 'standard' | 'compact' | 'accounting';

export interface RupiahFormatOptions {
  symbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  precision?: number;
  symbolPosition?: SymbolPosition;
  spaceBetween?: boolean;
  stripTrailingZero?: boolean;
  negativeFormat?: NegativeFormat;
  fallback?: string;
  locale?: string;
  currencyCode?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  formatStyle?: FormatStyle;
  hideZero?: boolean;
}

export interface ParsedRupiah {
  raw: string;
  numeric: number;
  isValid: boolean;
  currency: string;
  locale: string;
}

export interface CurrencyLocale {
  locale: string;
  currency: string;
  symbol: string;
  decimalSeparator: string;
  thousandSeparator: string;
}

export interface RupiahFormatterConfig extends RupiahFormatOptions {
  alias?: string;
  presets?: Record<string, Partial<RupiahFormatOptions>>;
}

export interface SeparatorPattern {
  thousand: string;
  decimal: string;
  symbol: string;
  space: boolean;
}

export type InputValue = number | string | bigint;

---

//tests/formatter.test.ts

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { RupiahFormatter, formatRupiah, RupiahValidator } from '../src';

describe('RupiahFormatter', () => {
  let formatter: RupiahFormatter;
  let consoleSpy: any;

  beforeEach(() => {
    formatter = new RupiahFormatter();
    // Suppress warnings in tests
    formatter.suppressWarnings(true);
    
    // Mock console.error to suppress error logs in tests
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('formats basic numbers correctly', () => {
    expect(formatter.format(1000)).toBe('Rp 1.000');
    expect(formatter.format(1234567.89)).toBe('Rp 1.234.567,89');
  });
  
  test('handles negative numbers', () => {
    expect(formatter.format(-5000)).toBe('-Rp 5.000');
    expect(formatter.format(-1234.56)).toBe('-Rp 1.234,56');
  });
  
  test('handles zero values', () => {
    expect(formatter.format(0)).toBe('Rp 0');
    expect(formatter.format(0, { hideZero: true, fallback: 'Gratis' })).toBe('Gratis');
  });
  
  test('respects custom options', () => {
    const customFormatter = new RupiahFormatter({
      symbol: 'IDR',
      decimalSeparator: '.',
      thousandSeparator: ',',
      spaceBetween: false,
      precision: 2,
      stripTrailingZero: false
    });
    expect(customFormatter.format(1234567.89)).toBe('IDR1,234,567.89');
  });
  
  test('handles edge cases in input', () => {
    expect(formatter.format('')).toBe('Rp 0');
    expect(formatter.format(null as any)).toBe('Rp 0');
    expect(formatter.format(undefined as any)).toBe('Rp 0');
    expect(formatter.format('invalid')).toBe('Rp 0');
    expect(formatter.format('Rp 1.000')).toBe('Rp 1.000'); // Already formatted
  });
  
  test('alias support works', () => {
    formatter.createAlias('compact', { 
      stripTrailingZero: true, 
      spaceBetween: false 
    });
    expect(formatter.formatWithAlias(1000.00, 'compact')).toBe('Rp1.000');
    
    // Test alias not found
    expect(() => formatter.formatWithAlias(1000, 'nonexistent')).toThrow();
  });
  
  test('cache management works', () => {
    formatter.format(1000);
    formatter.format(2000);
    const stats = formatter.getCacheStats();
    expect(stats.size).toBeGreaterThan(0);
    
    formatter.clearCache();
    const newStats = formatter.getCacheStats();
    expect(newStats.size).toBe(0);
  });
  
  test('throws error for invalid options', () => {
    expect(() => new RupiahFormatter({ precision: -1 })).toThrow();
    expect(() => new RupiahFormatter({ 
      decimalSeparator: '.', 
      thousandSeparator: '.' 
    })).toThrow();
  });
});

describe('RupiahValidator', () => {
  test('validates input values correctly', () => {
    expect(RupiahValidator.sanitizeValue(1000)).toBe(1000);
    expect(RupiahValidator.sanitizeValue('1000')).toBe(1000);
    expect(RupiahValidator.sanitizeValue('Rp 1.000')).toBe(1000);
    expect(RupiahValidator.sanitizeValue('')).toBe(0);
    expect(RupiahValidator.sanitizeValue(null)).toBe(0);
    expect(RupiahValidator.sanitizeValue(undefined)).toBe(0);
    expect(RupiahValidator.sanitizeValue('invalid')).toBe(0);
    expect(RupiahValidator.sanitizeValue(true)).toBe(1);
    expect(RupiahValidator.sanitizeValue(false)).toBe(0);
  });
  
  test('validates options correctly', () => {
    expect(() => RupiahValidator.validateOptions({ precision: -1 })).toThrow();
    expect(() => RupiahValidator.validateOptions({ 
      decimalSeparator: '.', 
      thousandSeparator: '.' 
    })).toThrow();
  });
});

describe('formatRupiah convenience function', () => {
  let consoleWarnSpy: any;
  
  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  
  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });
  
  test('formats without creating instance', () => {
    expect(formatRupiah(1000)).toBe('Rp 1.000');
  });
  
  test('formats with custom options', () => {
    expect(formatRupiah(1234567.89, {
      symbol: 'IDR',
      decimalSeparator: '.',
      thousandSeparator: ',',
      stripTrailingZero: false
    })).toBe('IDR 1,234,567.89');
  });
  
  test('handles errors gracefully', () => {
    expect(formatRupiah('invalid' as any)).toBe('Rp 0');
    expect(formatRupiah(null as any)).toBe('Rp 0');
    expect(formatRupiah(undefined as any)).toBe('Rp 0');
  });
});

---

//tests/parser.test.ts

import { describe, test, expect } from '@jest/globals';
import { RupiahParser, parseRupiah, isValidRupiah } from '../src';

describe('RupiahParser', () => {
  test('parses formatted string correctly', () => {
    const parsed = RupiahParser.parse('Rp 1.234.567,89');
    expect(parsed.numeric).toBe(1234567.89);
    expect(parsed.isValid).toBe(true);
    expect(parsed.currency).toBe('IDR');
  });
  
  test('extracts number from formatted string', () => {
    expect(RupiahParser.extractNumber('Rp 5.000')).toBe(5000);
  });
  
  test('validates rupiah string', () => {
    expect(RupiahParser.isValidRupiah('Rp 1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('IDR 1,000.00')).toBe(true);
    expect(RupiahParser.isValidRupiah('Rp1.000')).toBe(true);
    expect(RupiahParser.isValidRupiah('invalid')).toBe(false);
    expect(RupiahParser.isValidRupiah('not money')).toBe(false);
    expect(RupiahParser.isValidRupiah('123abc')).toBe(false);
  });
});

describe('parseRupiah convenience function', () => {
  test('parses formatted string', () => {
    expect(parseRupiah('Rp 1.234.567,89')).toBe(1234567.89);
  });
});

describe('isValidRupiah function', () => {
  test('validates rupiah strings', () => {
    expect(isValidRupiah('Rp 1.000')).toBe(true);
    expect(isValidRupiah('IDR 1,000.00')).toBe(true);
    expect(isValidRupiah('not money')).toBe(false);
  });
});

---

//tests/utils.test.ts

import { describe, test, expect } from '@jest/globals';
import { 
  isNumeric, 
  toNumber, 
  roundToPrecision,
  generateAlias 
} from '../src';

describe('Utilities', () => {
  test('isNumeric checks numeric values', () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('Rp 1.000')).toBe(true);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric(null)).toBe(false);
  });
  
  test('toNumber converts various inputs', () => {
    expect(toNumber(123)).toBe(123);
    expect(toNumber('123')).toBe(123);
    expect(toNumber('Rp 1.000')).toBe(1000);
    expect(toNumber(BigInt(1000))).toBe(1000);
  });
  
  test('roundToPrecision rounds correctly', () => {
    expect(roundToPrecision(1.234567, 2)).toBe(1.23);
    expect(roundToPrecision(1.235, 2)).toBe(1.24);
  });
  
  test('generateAlias creates safe alias names', () => {
    const alias = generateAlias({ symbol: 'Rp', precision: 2 });
    expect(typeof alias).toBe('string');
    expect(alias).toMatch(/^rp_/);
  });
});

---

//tsconfig.build.json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types",
    "outDir": "./dist",
    "jsx": "preserve"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "tests", 
    "examples", 
    "**/*.test.ts", 
    "**/*.spec.ts",
    "src/react/**/*",
    "src/hooks/**/*"
  ]
}

---

//tsconfig.jest.json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}

---

//tsconfig.json

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests", "src/react/**/*", "src/hooks/**/*"]
}

---

//tsconfig.react.json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types",
    "outDir": "./dist",
    "jsx": "react-jsx"
  },
  "include": [
    "src/react/**/*",
    "src/hooks/**/*"
  ],
  "exclude": [
    "tests", 
    "examples", 
    "**/*.test.ts", 
    "**/*.spec.ts"
  ]
}

---