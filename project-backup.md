# BACKUP PROYEK - FILE PENTING

**Dibuat:** 24/12/2025, 18.44.41
**Direktori:** /data/data/com.termux/files/home/library/new-rupiah-formatter
**Total File:** 22
**Total Ukuran:** 172 KB

## 📋 ITEM YANG DIBACKUP

```
src/
tests/
index.html
jest.config.js
package.json
tsconfig.json
tsconfig.build.json
tsconfig.react.json
tsconfig.jest.json
```

## 📄 DAFTAR FILE

1. `index.html` (108.61 KB)
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
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@devnovaa-id/new-rupiah-formatter v1.2.0 - Rupiah Formatter Library</title>
    <!-- Load Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" rel="stylesheet">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        /* Custom styles */
        .gradient-text {
            background: linear-gradient(135deg, #3b82f6, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
        }
        
        .code-block::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 32px;
            background: #2d3748;
            border-radius: 0.5rem 0.5rem 0 0;
        }
        
        .stats-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, #3b82f6, #10b981);
        }
        
        .changelog-item {
            position: relative;
            padding-left: 1.5rem;
        }
        
        .changelog-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 1.5rem;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #3b82f6;
            border: 2px solid #eff6ff;
        }
        
        .changelog-item::after {
            content: '';
            position: absolute;
            left: 4px;
            top: 2rem;
            bottom: -1rem;
            width: 2px;
            background: #e2e8f0;
        }
        
        /* FAQ Styles */
        .faq-question {
            transition: background-color 0.2s ease;
        }
        
        .faq-question:hover {
            background-color: #f9fafb;
        }
        
        .faq-answer {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Highlight active navigation */
        nav a.active {
            color: #3b82f6;
            font-weight: 600;
        }
        
        /* Smooth section transitions */
        section {
            scroll-margin-top: 4rem;
        }
        
        @media (min-width: 768px) {
            section {
                scroll-margin-top: 5rem;
            }
        }
        
        /* Better code block styling */
        .code-block pre {
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.5;
        }
        
        .code-block .copy-btn {
            transition: color 0.2s ease;
        }
        
        .code-block .copy-btn:hover {
            color: #ffffff;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* Code container for horizontal scroll */
        .code-container {
            max-width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        .code-container pre {
            min-width: 600px;
        }
        
        @media (min-width: 768px) {
            .code-container pre {
                min-width: 0;
            }
        }
    </style>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="font-['Inter'] bg-gray-50 text-gray-800 text-sm sm:text-base">
    <!-- Navigation - Responsif -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200 py-2">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div class="w-7 h-7 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-coins text-white text-xs"></i>
                    </div>
                    <span class="text-lg font-bold gradient-text">RupiahFormatter</span>
                    <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">v1.2.0</span>
                </div>
                
                <!-- Mobile menu button -->
                <button id="mobile-menu-button" class="md:hidden text-gray-600">
                    <i class="fas fa-bars text-lg"></i>
                </button>
                
                <!-- Desktop menu -->
                <div class="hidden md:flex items-center space-x-4 lg:space-x-6">
                    <a href="#features" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Features</a>
                    <a href="#quickstart" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Quick Start</a>
                    <a href="#advanced" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Advanced</a>
                    <a href="#performance" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Performance</a>
                    <a href="#api" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">API</a>
                    <a href="#demo" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Demo</a>
                    <a href="#faq" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">FAQ</a>
                    <a href="#migration" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Migration</a>
                    <a href="https://github.com/devnovaa-id/new-rupiah-formatter" target="_blank" class="text-gray-600 hover:text-blue-600">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                
                <button onclick="scrollToSection('installation')" class="hidden md:block bg-gradient-to-r from-blue-600 to-green-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                    Get Started
                </button>
            </div>
            
            <!-- Mobile menu -->
            <div id="mobile-menu" class="md:hidden hidden mt-2 pb-2 border-t border-gray-200 pt-2">
                <div class="flex flex-col space-y-2">
                    <a href="#features" class="text-gray-600 hover:text-blue-600 py-1">Features</a>
                    <a href="#quickstart" class="text-gray-600 hover:text-blue-600 py-1">Quick Start</a>
                    <a href="#advanced" class="text-gray-600 hover:text-blue-600 py-1">Advanced</a>
                    <a href="#performance" class="text-gray-600 hover:text-blue-600 py-1">Performance</a>
                    <a href="#api" class="text-gray-600 hover:text-blue-600 py-1">API</a>
                    <a href="#demo" class="text-gray-600 hover:text-blue-600 py-1">Demo</a>
                    <a href="#faq" class="text-gray-600 hover:text-blue-600 py-1">FAQ</a>
                    <a href="#migration" class="text-gray-600 hover:text-blue-600 py-1">Migration</a>
                    <a href="https://github.com/devnovaa-id/new-rupiah-formatter" target="_blank" class="text-gray-600 hover:text-blue-600 py-1">GitHub</a>
                    <button onclick="scrollToSection('installation')" class="bg-gradient-to-r from-blue-600 to-green-500 text-white px-3 py-1.5 rounded-lg font-semibold text-sm mt-2">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section - Responsif -->
    <section class="pt-16 sm:pt-20 pb-12 sm:pb-16 relative overflow-hidden">
        <div class="container mx-auto px-3 sm:px-4 relative">
            <div class="max-w-4xl mx-auto text-center">
                <div class="inline-flex items-center space-x-2 mb-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <span class="text-xs font-semibold text-blue-700">✨ v1.2.0 Released</span>
                    <span class="text-gray-500">•</span>
                    <span class="text-xs text-gray-600">Enhanced performance</span>
                </div>
                
                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    <span class="block text-gray-900">The Complete</span>
                    <span class="gradient-text">Rupiah Formatter</span>
                    <span class="block text-gray-900">for Modern Apps</span>
                </h1>
                
                <p class="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
                    A flexible, zero-dependency library for formatting, parsing, and validating Indonesian Rupiah with TypeScript support and React hooks.
                </p>
                
                <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                    <button onclick="scrollToSection('installation')" class="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-1.5 text-sm">
                        <i class="fas fa-rocket text-xs"></i>
                        <span>Get Started</span>
                    </button>
                    <button onclick="scrollToSection('demo')" class="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold border border-gray-200 hover:border-blue-300 flex items-center space-x-1.5 text-sm">
                        <i class="fas fa-play-circle text-xs"></i>
                        <span>Live Demo</span>
                    </button>
                    <a href="https://github.com/devnovaa-id/new-rupiah-formatter" target="_blank" class="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 flex items-center space-x-1.5 text-sm">
                        <i class="fab fa-github text-xs"></i>
                        <span>GitHub</span>
                    </a>
                </div>
                
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto">
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div class="text-lg sm:text-xl font-bold text-blue-600">0</div>
                        <div class="text-xs text-gray-600">Dependencies</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div class="text-lg sm:text-xl font-bold text-blue-600">100%</div>
                        <div class="text-xs text-gray-600">Test Coverage</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div class="text-lg sm:text-xl font-bold text-blue-600">9KB</div>
                        <div class="text-xs text-gray-600">Bundle Size</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div class="text-lg sm:text-xl font-bold text-blue-600">9</div>
                        <div class="text-xs text-gray-600">Built-in Presets</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Grid - Responsif -->
    <section id="features" class="py-10 sm:py-12 bg-white">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="text-center mb-8">
                <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">FEATURES</span>
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Everything You Need for Rupiah Formatting</h2>
                <p class="text-sm text-gray-600 max-w-2xl mx-auto">Designed for developers who need reliable, flexible, and performant Rupiah formatting.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div class="feature-card bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                        <i class="fas fa-bolt text-white text-sm"></i>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">Smart Formatting</h3>
                    <p class="text-xs sm:text-sm text-gray-600">Intelligent parsing of Indonesian & international formats with automatic locale detection.</p>
                </div>
                
                <div class="feature-card bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
                        <i class="fab fa-react text-white text-sm"></i>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">React Ready</h3>
                    <p class="text-xs sm:text-sm text-gray-600">Built-in hooks (useRupiah, useRupiahState) and components (RupiahDisplay) for React apps.</p>
                </div>
                
                <div class="feature-card bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                        <i class="fas fa-sliders-h text-white text-sm"></i>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">Fully Customizable</h3>
                    <p class="text-xs sm:text-sm text-gray-600">Control symbols, separators, precision, negative formats, and zero handling.</p>
                </div>
                
                <div class="feature-card bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-3">
                        <i class="fas fa-globe text-white text-sm"></i>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">Multi-Locale</h3>
                    <p class="text-xs sm:text-sm text-gray-600">Support for ID, US, DE, FR locales with proper separator handling.</p>
                </div>
                
                <div class="feature-card bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3">
                        <i class="fas fa-tachometer-alt text-white text-sm"></i>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">Performance Optimized</h3>
                    <p class="text-xs sm:text-sm text-gray-600">Smart caching, memoization, weak references, and zero dependencies for speed.</p>
                </div>
                
                <div class="feature-card bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-3">
                        <i class="fas fa-shield-alt text-white text-sm"></i>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">TypeScript First</h3>
                    <p class="text-xs sm:text-sm text-gray-600">Full TypeScript support with comprehensive type definitions and IntelliSense.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Installation - Responsif -->
    <section id="installation" class="py-10 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-3xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">INSTALLATION</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Get Started in Seconds</h2>
                </div>
                
                <div class="bg-white rounded-xl shadow overflow-hidden mb-6">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-base font-semibold text-gray-900 mb-1">Install via package manager</h3>
                        <p class="text-sm text-gray-600">Choose your preferred package manager to install the library.</p>
                    </div>
                    
                    <div class="p-4">
                        <div class="flex border-b border-gray-200 mb-4 overflow-x-auto">
                            <button class="tab-btn active px-3 py-1.5 font-medium text-gray-900 border-b-2 border-blue-600 whitespace-nowrap text-sm">
                                <i class="fab fa-npm mr-1.5"></i>npm
                            </button>
                            <button class="tab-btn px-3 py-1.5 font-medium text-gray-600 whitespace-nowrap text-sm" onclick="changeTab('yarn')">
                                <i class="fab fa-yarn mr-1.5"></i>yarn
                            </button>
                            <button class="tab-btn px-3 py-1.5 font-medium text-gray-600 whitespace-nowrap text-sm" onclick="changeTab('pnpm')">
                                <i class="fas fa-box mr-1.5"></i>pnpm
                            </button>
                        </div>
                        
                        <div id="npm-tab" class="tab-content">
                            <div class="code-block bg-gray-900 rounded-lg overflow-hidden">
                                <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                    <div class="flex items-center space-x-1.5">
                                        <i class="fas fa-terminal text-gray-400"></i>
                                        <span class="text-gray-300 font-mono text-xs">Terminal</span>
                                    </div>
                                    <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('npm-code')">
                                        <i class="far fa-copy"></i>
                                    </button>
                                </div>
                                <pre id="npm-code" class="language-bash p-3 text-xs overflow-x-auto"><code>npm install @devnovaa-id/new-rupiah-formatter</code></pre>
                            </div>
                        </div>
                        
                        <div id="yarn-tab" class="tab-content hidden">
                            <div class="code-block bg-gray-900 rounded-lg overflow-hidden">
                                <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                    <div class="flex items-center space-x-1.5">
                                        <i class="fas fa-terminal text-gray-400"></i>
                                        <span class="text-gray-300 font-mono text-xs">Terminal</span>
                                    </div>
                                    <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('yarn-code')">
                                        <i class="far fa-copy"></i>
                                    </button>
                                </div>
                                <pre id="yarn-code" class="language-bash p-3 text-xs overflow-x-auto"><code>yarn add @devnovaa-id/new-rupiah-formatter</code></pre>
                            </div>
                        </div>
                        
                        <div id="pnpm-tab" class="tab-content hidden">
                            <div class="code-block bg-gray-900 rounded-lg overflow-hidden">
                                <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                    <div class="flex items-center space-x-1.5">
                                        <i class="fas fa-terminal text-gray-400"></i>
                                        <span class="text-gray-300 font-mono text-xs">Terminal</span>
                                    </div>
                                    <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('pnpm-code')">
                                        <i class="far fa-copy"></i>
                                    </button>
                                </div>
                                <pre id="pnpm-code" class="language-bash p-3 text-xs overflow-x-auto"><code>pnpm add @devnovaa-id/new-rupiah-formatter</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Start - Responsif dengan scroll horizontal untuk code -->
    <section id="quickstart" class="py-10 sm:py-12 bg-white">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">QUICK START</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Start Formatting in Minutes</h2>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    <div class="space-y-4 min-w-0">
                        <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Basic Formatting</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-js text-yellow-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">JavaScript</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('basic-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="basic-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { formatRupiah, parseRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Basic formatting
console.log(formatRupiah(1000));           // "Rp 1.000"
console.log(formatRupiah(1234567.89));    // "Rp 1.234.567,89"
console.log(formatRupiah(-5000));         // "-Rp 5.000"

// Parsing formatted strings
console.log(parseRupiah('Rp 1.234.567,89')); // 1234567.89

// Validation
import { isValidRupiah } from '@devnovaa-id/new-rupiah-formatter';
console.log(isValidRupiah('Rp 1.000'));   // true</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">React Integration</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-react text-blue-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">React</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('react-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="react-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import React from 'react';
import { useRupiah, RupiahDisplay } from '@devnovaa-id/new-rupiah-formatter/react';

function ProductCard({ product }) {
  const { format } = useRupiah();
  
  return (
    &lt;div className="product-card"&gt;
      &lt;h3&gt;{product.name}&lt;/h3&gt;
      &lt;RupiahDisplay 
        value={product.price}
        className="text-2xl font-bold"
        options={{
          symbol: 'Rp',
          spaceBetween: false,
          stripTrailingZero: true
        }}
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4 min-w-0">
                        <div class="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Advanced Features</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-js text-yellow-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">JavaScript</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('advanced-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="advanced-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { RupiahFormatter } from '@devnovaa-id/new-rupiah-formatter';

// Create formatter instance
const formatter = new RupiahFormatter({
  symbol: 'IDR',
  decimalSeparator: '.',
  thousandSeparator: ',',
  spaceBetween: false
});

// Advanced formatting
console.log(formatter.format(1234567.89));
// "IDR1,234,567.89"

// Create and use aliases
formatter.createAlias('compact', {
  stripTrailingZero: true,
  spaceBetween: false,
  precision: 0
});
console.log(formatter.formatWithAlias(1000.50, 'compact'));
// "IDR1,001"

// Range formatting
console.log(formatter.formatRange(1000, 5000));
// "IDR1,000 - IDR5,000"

// With abbreviation
console.log(formatter.formatWithAbbreviation(1500000));
// "IDR1,500,000 (≈1.5M)"</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg border border-orange-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Preset Examples</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-js text-yellow-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">JavaScript</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('preset-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="preset-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Built-in presets
console.log(formatRupiah(1234567.89, { preset: 'standard' }));
// "Rp 1.234.567,89"

console.log(formatRupiah(1234567.89, { preset: 'compact' }));
// "Rp1.234.568"

console.log(formatRupiah(1234567.89, { preset: 'international' }));
// "IDR 1,234,567.89"

console.log(formatRupiah(1234567.89, { preset: 'ecommerce' }));
// "Rp1.234.568"

console.log(formatRupiah(1234567.89, { preset: 'financial' }));
// "Rp 1.234.567,89"

console.log(formatRupiah(1234567.89, { preset: 'mobile' }));
// "Rp1.234.568"

console.log(formatRupiah(1234567.89, { preset: 'crypto' }));
// "1,234,567.89000000"</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Advanced Usage - Responsif dengan struktur sama -->
    <section id="advanced" class="py-10 sm:py-12 bg-white">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">ADVANCED USAGE</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Advanced Features & Scenarios</h2>
                    <p class="text-sm text-gray-600 max-w-2xl mx-auto">Learn how to use advanced features for complex use cases.</p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    <div class="space-y-4 min-w-0">
                        <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Real-time Input Formatting</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-react text-blue-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">React Example</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('input-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="input-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import React, { useState } from 'react';
    import { useRupiahInput } from '@devnovaa-id/new-rupiah-formatter/react';
    
    function PriceInput() {
      const {
        inputValue,
        formattedValue,
        handleChange,
        handleFocus,
        handleBlur,
        numericValue
      } = useRupiahInput(0, {
        symbol: 'Rp',
        spaceBetween: false
      });
    
      return (
        &lt;div className="space-y-2"&gt;
          &lt;input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded-lg"
          /&gt;
          &lt;div className="text-sm text-gray-600"&gt;
            Live preview: &lt;span className="font-bold"&gt;{formattedValue}&lt;/span&gt;
          &lt;/div&gt;
          &lt;div className="text-xs text-gray-500"&gt;
            Numeric value: {numericValue}
          &lt;/div&gt;
        &lt;/div&gt;
      );
    }</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Financial Calculations</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-js text-yellow-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">JavaScript</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('financial-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="financial-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { RupiahFormatter } from '@devnovaa-id/new-rupiah-formatter';
    
    const financialFormatter = new RupiahFormatter({
      preset: 'financial',
      negativeFormat: 'parentheses'
    });
    
    // Financial statements
    const revenue = 25000000;
    const expenses = 18500000;
    const profit = revenue - expenses;
    
    console.log(financialFormatter.format(revenue));
    // "Rp 25.000.000"
    
    console.log(financialFormatter.format(expenses));
    // "Rp 18.500.000"
    
    console.log(financialFormatter.format(profit));
    // "Rp 6.500.000"
    
    // Negative value in parentheses for accounting
    const loss = -500000;
    console.log(financialFormatter.format(loss));
    // "(Rp 500.000)"
    
    // Percentage calculations
    console.log(financialFormatter.calculatePercentage(expenses, revenue));
    // "Rp 18.500.000 (74.0%)"
    
    console.log(financialFormatter.calculateGrowth(20000000, 25000000));
    // "Rp 20.000.000 → Rp 25.000.000 (+25.0%)"</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4 min-w-0">
                        <div class="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">E-commerce Applications</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-react text-blue-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">React E-commerce</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('ecommerce-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="ecommerce-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import React from 'react';
    import { RupiahDisplay, useRupiah } from '@devnovaa-id/new-rupiah-formatter/react';
    
    function ProductCard({ product, onAddToCart }) {
      const { format, formatWithAbbreviation } = useRupiah({
        preset: 'ecommerce'
      });
    
      const calculateDiscountedPrice = () => {
        if (product.discount) {
          return product.price * (1 - product.discount / 100);
        }
        return product.price;
      };
    
      const discountedPrice = calculateDiscountedPrice();
    
      return (
        &lt;div className="product-card border rounded-lg p-4"&gt;
          &lt;img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" /&gt;
          &lt;h3 className="font-semibold mt-3"&gt;{product.name}&lt;/h3&gt;
          
          &lt;div className="mt-2"&gt;
            {product.discount ? (
              &lt;&gt;
                &lt;div className="flex items-center space-x-2"&gt;
                  &lt;span className="text-red-600 font-bold"&gt;
                    &lt;RupiahDisplay value={discountedPrice} /&gt;
                  &lt;/span&gt;
                  &lt;span className="text-gray-500 line-through text-sm"&gt;
                    {format(product.price)}
                  &lt;/span&gt;
                  &lt;span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"&gt;
                    {product.discount}% OFF
                  &lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="text-green-600 text-sm mt-1"&gt;
                  Save {format(product.price - discountedPrice)}
                &lt;/div&gt;
              &lt;/&gt;
            ) : (
              &lt;span className="font-bold"&gt;
                &lt;RupiahDisplay value={product.price} /&gt;
              &lt;/span&gt;
            )}
          &lt;/div&gt;
    
          &lt;div className="text-xs text-gray-500 mt-1"&gt;
            {formatWithAbbreviation(product.price)}
          &lt;/div&gt;
    
          &lt;button 
            onClick={() => onAddToCart(product)}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          &gt;
            Add to Cart
          &lt;/button&gt;
        &lt;/div&gt;
      );
    }</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg border border-orange-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Mobile & Responsive</h3>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-js text-yellow-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">Mobile Formatting</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('mobile-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="mobile-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { RupiahFormatter } from '@devnovaa-id/new-rupiah-formatter';
    
    // Mobile-friendly formatter
    const mobileFormatter = new RupiahFormatter({
      preset: 'mobile',
      stripTrailingZero: true,
      spaceBetween: false
    });
    
    // Compact formatting for small screens
    const largeNumber = 1234567890;
    console.log(mobileFormatter.format(largeNumber));
    // "Rp1.234.567.890"
    
    console.log(mobileFormatter.formatWithAbbreviation(largeNumber));
    // "Rp1.234.567.890 (≈1.2B)"
    
    // Different formatting based on screen size
    function formatForScreenSize(value, isMobile) {
      const formatter = new RupiahFormatter(
        isMobile ? { preset: 'mobile' } : { preset: 'standard' }
      );
      return formatter.format(value);
    }
    
    // Example usage
    const price = 1500000;
    console.log(formatForScreenSize(price, true));   // Mobile: "Rp1.500.000"
    console.log(formatForScreenSize(price, false));  // Desktop: "Rp 1.500.000"
    
    // Range formatting for price filters
    const minPrice = 10000;
    const maxPrice = 1000000;
    console.log(mobileFormatter.formatRange(minPrice, maxPrice, ' - '));
    // "Rp10.000 - Rp1.000.000"</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Performance Tips - Responsif dengan struktur sama -->
    <section id="performance" class="py-10 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">PERFORMANCE TIPS</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Optimize Your Usage</h2>
                    <p class="text-sm text-gray-600 max-w-2xl mx-auto">Best practices for maximum performance and efficiency.</p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    <div class="space-y-4 min-w-0">
                        <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Caching Strategy</h3>
                            <p class="text-xs sm:text-sm text-gray-600 mb-3">The library uses smart caching. Reuse formatter instances for better performance.</p>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fas fa-tachometer-alt text-gray-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">Performance</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('caching-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="caching-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>// ✅ GOOD: Reuse formatter instance
    const formatter = new RupiahFormatter();
    for (const price of prices) {
      console.log(formatter.format(price));
    }
    
    // ❌ AVOID: Creating new instances in loops
    for (const price of prices) {
      const formatter = new RupiahFormatter(); // Inefficient
      console.log(formatter.format(price));
    }
    
    // ✅ Use static method for one-off formatting
    console.log(RupiahFormatter.format(1000)); // "Rp 1.000"
    
    // ✅ Use singleton pattern for app-wide consistency
    const getFormatter = (() => {
      let instance;
      return () => {
        if (!instance) {
          instance = new RupiahFormatter();
        }
        return instance;
      };
    })();</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Memory Management</h3>
                            <p class="text-xs sm:text-sm text-gray-600 mb-3">Optimize memory usage with proper cache management and cleanup.</p>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fas fa-memory text-gray-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">Memory</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('memory-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="memory-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { RupiahFormatter } from '@devnovaa-id/new-rupiah-formatter';
    
    const formatter = new RupiahFormatter();
    
    // Monitor cache stats
    const stats = formatter.getCacheStats();
    console.log('Cache hits:', stats.hits);
    console.log('Cache misses:', stats.misses);
    console.log('Hit rate:', stats.hitRate + '%');
    
    // Set cache size limit
    formatter.setCacheSizeLimit(5000); // Store up to 5000 entries
    
    // Clear cache when needed
    formatter.clearCache();
    
    // Use weak references for long-lived instances
    const key = {};
    const sharedFormatter = RupiahFormatter.getInstance(key, {
      symbol: 'Rp',
      precision: 2
    });
    
    // Clean up when done
    RupiahFormatter.removeInstance(key);</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4 min-w-0">
                        <div class="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">React Optimization</h3>
                            <p class="text-xs sm:text-sm text-gray-600 mb-3">Best practices for React applications to prevent unnecessary re-renders.</p>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fab fa-react text-blue-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">React</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('react-optimization-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="react-optimization-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import React, { useMemo } from 'react';
    import { useRupiah, MemoizedRupiahDisplay } from '@devnovaa-id/new-rupiah-formatter/react';
    
    // ✅ Use useMemo for expensive calculations
    function ProductList({ products }) {
      const { format } = useRupiah();
      
      const formattedPrices = useMemo(() => 
        products.map(p => format(p.price)), 
        [products, format]
      );
      
      return (
        &lt;div&gt;
          {products.map((product, index) => (
            &lt;div key={product.id}&gt;
              {product.name}: {formattedPrices[index]}
            &lt;/div&gt;
          ))}
        &lt;/div&gt;
      );
    }
    
    // ✅ Use MemoizedRupiahDisplay for static values
    function StaticPrice({ price }) {
      return &lt;MemoizedRupiahDisplay value={price} /&gt;;
    }
    
    // ✅ Separate dynamic and static formatting
    function ProductPrice({ price, discount }) {
      const { format } = useRupiah();
      
      return (
        &lt;div&gt;
          &lt;MemoizedRupiahDisplay value={price} /&gt;
          {discount && (
            &lt;span className="text-green-600"&gt;
              Save {format(discount)}
            &lt;/span&gt;
          )}
        &lt;/div&gt;
      );
    }</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg border border-orange-100">
                            <h3 class="text-base font-semibold text-gray-900 mb-2">Batch Processing</h3>
                            <p class="text-xs sm:text-sm text-gray-600 mb-3">Efficiently process large datasets with batch operations.</p>
                            <div class="code-container max-w-full overflow-x-auto">
                                <div class="code-block bg-gray-900 rounded-lg overflow-hidden max-w-full">
                                    <div class="flex justify-between items-center px-3 py-2 bg-gray-800">
                                        <div class="flex items-center space-x-1.5">
                                            <i class="fas fa-bolt text-gray-400"></i>
                                            <span class="text-gray-300 font-mono text-xs">Batch Processing</span>
                                        </div>
                                        <button class="copy-btn text-gray-400 hover:text-white text-xs" onclick="copyCode('batch-code')">
                                            <i class="far fa-copy"></i>
                                        </button>
                                    </div>
                                    <pre id="batch-code" class="language-javascript p-3 text-xs overflow-x-auto max-w-full whitespace-pre"><code>import { RupiahFormatter } from '@devnovaa-id/new-rupiah-formatter';
    
    // Create single formatter instance
    const formatter = new RupiahFormatter();
    
    // Batch format function
    function batchFormatRupiah(values) {
      return values.map(value => formatter.format(value));
    }
    
    // Process in chunks for very large datasets
    function chunkFormatRupiah(values, chunkSize = 1000) {
      const chunks = [];
      for (let i = 0; i < values.length; i += chunkSize) {
        chunks.push(values.slice(i, i + chunkSize));
      }
      
      return chunks.flatMap(chunk => batchFormatRupiah(chunk));
    }
    
    // Parallel processing for maximum performance
    async function parallelFormatRupiah(values, maxConcurrent = 4) {
      const results = [];
      
      for (let i = 0; i < values.length; i += maxConcurrent) {
        const chunk = values.slice(i, i + maxConcurrent);
        const promises = chunk.map(value => 
          Promise.resolve(formatter.format(value))
        );
        const chunkResults = await Promise.all(promises);
        results.push(...chunkResults);
      }
      
      return results;
    }
    
    // Usage with large dataset
    const largeDataset = Array.from({ length: 10000 }, (_, i) => i * 1000);
    const formatted = batchFormatRupiah(largeDataset);</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Live Demo - Responsif -->
    <section id="demo" class="py-10 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">LIVE DEMO</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Interactive Playground</h2>
                    <p class="text-sm text-gray-600 max-w-2xl mx-auto">Try out different formatting options and see the results instantly.</p>
                </div>
                
                <div class="bg-white rounded-xl shadow overflow-hidden mb-6">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-base font-semibold text-gray-900">Rupiah Formatter Playground</h3>
                    </div>
                    
                    <div class="p-4">
                        <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                    <input type="number" id="demo-amount" value="1234567.89" step="1000" 
                                           class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none text-sm">
                                </div>
                                
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                                        <select id="demo-symbol" class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none text-sm">
                                            <option value="Rp">Rp (ID)</option>
                                            <option value="IDR">IDR (Intl)</option>
                                            <option value="$">$</option>
                                            <option value="€">€</option>
                                            <option value="">No Symbol</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Preset</label>
                                        <select id="demo-preset" class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none text-sm">
                                            <option value="standard">Standard</option>
                                            <option value="compact">Compact</option>
                                            <option value="international">International</option>
                                            <option value="ecommerce">E-commerce</option>
                                            <option value="financial">Financial</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="crypto">Crypto</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Precision: <span id="precision-value">2</span></label>
                                    <input type="range" id="demo-precision" min="0" max="8" value="2" step="1" 
                                           class="w-full h-1.5 bg-gray-200 rounded">
                                </div>
                                
                                <button onclick="runDemo()" class="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                                    <i class="fas fa-play mr-1.5"></i> Format Rupiah
                                </button>
                            </div>
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Formatted Output</label>
                                    <div id="demo-output" class="p-4 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-center text-lg min-h-[60px] flex items-center justify-center">
                                        Rp 1.234.567,89
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Generated Code</label>
                                    <div id="demo-code" class="bg-gray-900 text-gray-300 p-3 rounded-lg font-mono text-xs overflow-x-auto min-h-[80px]">
// Generated code will appear here
                                    </div>
                                    <button onclick="copyDemoCode()" class="w-full mt-2 bg-gray-800 text-white py-1.5 rounded-lg font-medium hover:bg-gray-700 transition text-sm">
                                        <i class="far fa-copy mr-1.5"></i> Copy Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="stats-card p-4 rounded-lg text-center">
                        <div class="text-xl font-bold" id="cache-hits">0</div>
                        <div class="text-xs opacity-90">Cache Hits</div>
                    </div>
                    <div class="stats-card p-4 rounded-lg text-center">
                        <div class="text-xl font-bold" id="cache-misses">0</div>
                        <div class="text-xs opacity-90">Cache Misses</div>
                    </div>
                    <div class="stats-card p-4 rounded-lg text-center">
                        <div class="text-xl font-bold" id="cache-hit-rate">0%</div>
                        <div class="text-xs opacity-90">Hit Rate</div>
                    </div>
                    <div class="stats-card p-4 rounded-lg text-center">
                        <div class="text-xl font-bold" id="cache-size">0</div>
                        <div class="text-xs opacity-90">Cache Size</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- API Reference - Responsif -->
    <section id="api" class="py-10 sm:py-12 bg-white">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">API REFERENCE</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Complete API Documentation</h2>
                </div>
                
                <div class="grid lg:grid-cols-3 gap-4 sm:gap-6">
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-4">
                            <div class="p-3 border-b border-gray-200">
                                <h3 class="text-base font-semibold text-gray-900">Core Functions</h3>
                            </div>
                            <div class="p-3 overflow-x-auto">
                                <table class="w-full min-w-[400px]">
                                    <thead>
                                        <tr class="border-b border-gray-200">
                                            <th class="text-left py-2 px-2 text-xs font-semibold text-gray-700">Function</th>
                                            <th class="text-left py-2 px-2 text-xs font-semibold text-gray-700">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-sm">
                                        <tr class="border-b border-gray-100 hover:bg-gray-50">
                                            <td class="py-2 px-2"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">formatRupiah()</code></td>
                                            <td class="py-2 px-2 text-gray-600">Format value to Rupiah string</td>
                                        </tr>
                                        <tr class="border-b border-gray-100 hover:bg-gray-50">
                                            <td class="py-2 px-2"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">parseRupiah()</code></td>
                                            <td class="py-2 px-2 text-gray-600">Parse Rupiah string to number</td>
                                        </tr>
                                        <tr class="border-b border-gray-100 hover:bg-gray-50">
                                            <td class="py-2 px-2"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">isValidRupiah()</code></td>
                                            <td class="py-2 px-2 text-gray-600">Validate Rupiah string format</td>
                                        </tr>
                                        <tr class="border-b border-gray-100 hover:bg-gray-50">
                                            <td class="py-2 px-2"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">formatRupiahWithAbbreviation()</code></td>
                                            <td class="py-2 px-2 text-gray-600">Format with K/M/B/T abbreviation</td>
                                        </tr>
                                        <tr class="hover:bg-gray-50">
                                            <td class="py-2 px-2"><code class="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">formatRupiahRange()</code></td>
                                            <td class="py-2 px-2 text-gray-600">Format a range of values</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                            <div class="p-3 border-b border-gray-200">
                                <h3 class="text-base font-semibold text-gray-900">Built-in Presets</h3>
                            </div>
                            <div class="p-3">
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">standard</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"Rp 1.234,56"</code>
                                    </li>
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">compact</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"Rp1.235"</code>
                                    </li>
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">international</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"IDR 1,234.56"</code>
                                    </li>
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">ecommerce</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"Rp1.235"</code>
                                    </li>
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">financial</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"Rp 1.234,56"</code>
                                    </li>
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">mobile</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"Rp1.235"</code>
                                    </li>
                                    <li class="flex items-center">
                                        <div class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                                        <span class="text-gray-700">crypto</span>
                                        <code class="ml-auto text-xs text-gray-500 font-mono">"1,234.56"</code>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                            <div class="p-3 border-b border-gray-200">
                                <h3 class="text-base font-semibold text-gray-900">React API</h3>
                            </div>
                            <div class="p-3">
                                <div class="space-y-2 text-sm">
                                    <div>
                                        <code class="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">useRupiah()</code>
                                        <p class="text-gray-600 mt-0.5">Main hook with full formatter</p>
                                    </div>
                                    <div>
                                        <code class="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">useRupiahFormat()</code>
                                        <p class="text-gray-600 mt-0.5">Simple formatting hook</p>
                                    </div>
                                    <div>
                                        <code class="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">useRupiahState()</code>
                                        <p class="text-gray-600 mt-0.5">State management hook</p>
                                    </div>
                                    <div>
                                        <code class="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">RupiahDisplay</code>
                                        <p class="text-gray-600 mt-0.5">Display component</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Changelog - Responsif -->
    <section id="changelog" class="py-10 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-3xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">CHANGELOG</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Release History</h2>
                </div>
                
                <div class="bg-white rounded-xl shadow overflow-hidden">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-base font-semibold text-gray-900">Version Updates</h3>
                    </div>
                    
                    <div class="p-4">
                        <div class="space-y-4">
                            <div class="changelog-item">
                                <div class="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">v1.2.0</span>
                                        <span class="text-xs text-gray-500">2025-12-24</span>
                                    </div>
                                    <ul class="space-y-1 text-sm">
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>Enhanced caching with configurable limits</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>Weak reference support for memory management</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>Improved parsing of mixed separator formats</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="changelog-item">
                                <div class="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-100">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">v1.1.0</span>
                                        <span class="text-xs text-gray-500">2025-12-23</span>
                                    </div>
                                    <ul class="space-y-1 text-sm">
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>Added new presets: ecommerce, financial, mobile, crypto</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>Advanced features: abbreviation, percentage, growth calculations</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="changelog-item">
                                <div class="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="px-2 py-0.5 bg-gray-600 text-white text-xs font-semibold rounded-full">v1.0.0</span>
                                        <span class="text-xs text-gray-500">2025-12-15</span>
                                    </div>
                                    <ul class="space-y-1 text-sm">
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-gray-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>Initial release with core formatting functionality</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-gray-500 mt-0.5 mr-1.5 text-xs"></i>
                                            <span>International locale support</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section - Responsif -->
    <section id="faq" class="py-10 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">FAQ</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
                    <p class="text-sm text-gray-600 max-w-2xl mx-auto">Find answers to common questions about the library.</p>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-question w-full text-left p-4 flex justify-between items-center hover:bg-gray-50">
                            <span class="font-medium text-gray-900 text-sm sm:text-base">Is this library compatible with Node.js?</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                        <div class="faq-answer p-4 pt-0 border-t border-gray-100 hidden">
                            <p class="text-gray-600 text-sm sm:text-base">Yes! The library works in both browser and Node.js environments. It has zero dependencies and uses only built-in JavaScript features.</p>
                            <div class="code-container max-w-full overflow-x-auto mt-2">
                                <pre class="language-javascript text-xs p-3 bg-gray-50 rounded"><code>// Node.js usage example
const { formatRupiah, parseRupiah } = require('@devnovaa-id/new-rupiah-formatter');

console.log(formatRupiah(1000000)); // "Rp 1.000.000"

// Or with ES modules
import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';</code></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-question w-full text-left p-4 flex justify-between items-center hover:bg-gray-50">
                            <span class="font-medium text-gray-900 text-sm sm:text-base">How do I handle decimal rounding?</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                        <div class="faq-answer p-4 pt-0 border-t border-gray-100 hidden">
                            <p class="text-gray-600 text-sm sm:text-base">The library uses proper rounding (banker's rounding) with configurable precision. You can control rounding behavior through the precision option.</p>
                            <div class="code-container max-w-full overflow-x-auto mt-2">
                                <pre class="language-javascript text-xs p-3 bg-gray-50 rounded"><code>import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

console.log(formatRupiah(1234.567, { precision: 2 })); // "Rp 1.234,57"
console.log(formatRupiah(1234.564, { precision: 2 })); // "Rp 1.234,56"
console.log(formatRupiah(1234.5, { precision: 2 })); // "Rp 1.234,50"

// Use stripTrailingZero to remove unnecessary zeros
console.log(formatRupiah(1000.00, { 
  precision: 2, 
  stripTrailingZero: true 
})); // "Rp 1.000"</code></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-question w-full text-left p-4 flex justify-between items-center hover:bg-gray-50">
                            <span class="font-medium text-gray-900 text-sm sm:text-base">Can I use this with Vue.js or Angular?</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                        <div class="faq-answer p-4 pt-0 border-t border-gray-100 hidden">
                            <p class="text-gray-600 text-sm sm:text-base">Yes! While the library includes React-specific hooks and components, the core functionality works with any JavaScript framework.</p>
                            <div class="code-container max-w-full overflow-x-auto mt-2">
                                <pre class="language-javascript text-xs p-3 bg-gray-50 rounded"><code>// Vue.js example
import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

export default {
  methods: {
    formatPrice(price) {
      return formatRupiah(price, { preset: 'ecommerce' });
    }
  }
}

// Angular example
import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

@Component({...})
export class ProductComponent {
  formatPrice(price: number): string {
    return formatRupiah(price);
  }
}</code></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-question w-full text-left p-4 flex justify-between items-center hover:bg-gray-50">
                            <span class="font-medium text-gray-900 text-sm sm:text-base">How do I handle currency conversion?</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                        <div class="faq-answer p-4 pt-0 border-t border-gray-100 hidden">
                            <p class="text-gray-600 text-sm sm:text-base">This library focuses on formatting, not currency conversion. However, you can easily integrate it with conversion logic:</p>
                            <div class="code-container max-w-full overflow-x-auto mt-2">
                                <pre class="language-javascript text-xs p-3 bg-gray-50 rounded"><code>import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Example currency conversion wrapper
async function convertAndFormat(amount, fromCurrency, toCurrency = 'IDR') {
  // Get conversion rate from your API
  const rate = await getConversionRate(fromCurrency, toCurrency);
  const convertedAmount = amount * rate;
  
  return {
    amount: convertedAmount,
    formatted: formatRupiah(convertedAmount, {
      symbol: toCurrency === 'IDR' ? 'Rp' : toCurrency,
      locale: toCurrency === 'IDR' ? 'id-ID' : 'en-US'
    })
  };
}

// Usage
const result = await convertAndFormat(100, 'USD', 'IDR');
console.log(result.formatted); // "Rp 1.500.000" (assuming 1 USD = 15000 IDR)</code></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-question w-full text-left p-4 flex justify-between items-center hover:bg-gray-50">
                            <span class="font-medium text-gray-900 text-sm sm:text-base">What's the bundle size impact?</span>
                            <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                        </button>
                        <div class="faq-answer p-4 pt-0 border-t border-gray-100 hidden">
                            <p class="text-gray-600 text-sm sm:text-base">The library is extremely lightweight (~9KB gzipped) with zero dependencies. Tree-shaking is fully supported, so unused features won't be included in your bundle.</p>
                            <div class="grid grid-cols-2 gap-3 mt-3">
                                <div class="text-center p-3 bg-blue-50 rounded">
                                    <div class="text-lg font-bold text-blue-700">~9KB</div>
                                    <div class="text-xs text-blue-600">Gzipped</div>
                                </div>
                                <div class="text-center p-3 bg-green-50 rounded">
                                    <div class="text-lg font-bold text-green-700">0</div>
                                    <div class="text-xs text-green-600">Dependencies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Migration Guide Section - Responsif -->
    <section id="migration" class="py-10 sm:py-12 bg-white">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-8">
                    <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">MIGRATION GUIDE</span>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Migrating from Other Libraries</h2>
                    <p class="text-sm text-gray-600 max-w-2xl mx-auto">Easy migration from popular Rupiah formatting libraries.</p>
                </div>
                
                <div class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-6">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-base font-semibold text-gray-900 mb-1">From rupiah-format</h3>
                        <p class="text-sm text-gray-600">Simple migration with similar API structure.</p>
                    </div>
                    
                    <div class="p-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 class="font-medium text-gray-800 mb-2 text-sm">Before (rupiah-format)</h4>
                                <div class="code-container max-w-full overflow-x-auto">
                                    <div class="code-block bg-red-50 rounded-lg overflow-hidden">
                                        <div class="flex justify-between items-center px-3 py-2 bg-red-100">
                                            <span class="text-gray-700 font-mono text-xs">Old Code</span>
                                        </div>
                                        <pre class="language-javascript p-3 text-xs overflow-x-auto"><code>const rupiah = require('rupiah-format');

// Basic formatting
console.log(rupiah.format(1000)); // "Rp 1.000"

// With options
console.log(rupiah.format(1000, {
  symbol: 'IDR',
  decimalSeparator: '.',
  thousandSeparator: ','
}));</code></pre>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="font-medium text-gray-800 mb-2 text-sm">After (new-rupiah-formatter)</h4>
                                <div class="code-container max-w-full overflow-x-auto">
                                    <div class="code-block bg-green-50 rounded-lg overflow-hidden">
                                        <div class="flex justify-between items-center px-3 py-2 bg-green-100">
                                            <span class="text-gray-700 font-mono text-xs">New Code</span>
                                        </div>
                                        <pre class="language-javascript p-3 text-xs overflow-x-auto"><code>import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';

// Basic formatting (same result)
console.log(formatRupiah(1000)); // "Rp 1.000"

// With options (similar structure)
console.log(formatRupiah(1000, {
  symbol: 'IDR',
  decimalSeparator: '.',
  thousandSeparator: ','
}));

// Additional features available
console.log(formatRupiah(1000, { preset: 'international' }));</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-base font-semibold text-gray-900 mb-1">From Manual Formatting</h3>
                        <p class="text-sm text-gray-600">Replace custom formatting logic with robust library functions.</p>
                    </div>
                    
                    <div class="p-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 class="font-medium text-gray-800 mb-2 text-sm">Before (Custom Function)</h4>
                                <div class="code-container max-w-full overflow-x-auto">
                                    <div class="code-block bg-red-50 rounded-lg overflow-hidden">
                                        <div class="flex justify-between items-center px-3 py-2 bg-red-100">
                                            <span class="text-gray-700 font-mono text-xs">Old Custom Code</span>
                                        </div>
                                        <pre class="language-javascript p-3 text-xs overflow-x-auto"><code>function formatRupiahCustom(num) {
  if (typeof num !== 'number') return 'Rp 0';
  
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return 'Rp ' + parts.join(',');
}

// Issues with this approach:
// - No error handling
// - Limited options
// - No parsing capability
// - No validation
// - Manual edge case handling</code></pre>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="font-medium text-gray-800 mb-2 text-sm">After (Library)</h4>
                                <div class="code-container max-w-full overflow-x-auto">
                                    <div class="code-block bg-green-50 rounded-lg overflow-hidden">
                                        <div class="flex justify-between items-center px-3 py-2 bg-green-100">
                                            <span class="text-gray-700 font-mono text-xs">New Library Code</span>
                                        </div>
                                        <pre class="language-javascript p-3 text-xs overflow-x-auto"><code>import { formatRupiah, parseRupiah, isValidRupiah } from '@devnovaa-id/new-rupiah-formatter';

// All edge cases handled
console.log(formatRupiah(1000)); // "Rp 1.000"
console.log(formatRupiah('1000')); // "Rp 1.000"
console.log(formatRupiah(null)); // "Rp 0"
console.log(formatRupiah(undefined)); // "Rp 0"

// Additional capabilities
console.log(parseRupiah('Rp 1.000')); // 1000
console.log(isValidRupiah('Rp 1.000')); // true

// Advanced features
console.log(formatRupiah(1500000, { 
  withAbbreviation: true 
})); // "Rp 1.500.000 (≈1.5M)"</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-medium text-gray-800 mb-2 text-sm">Migration Benefits</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li class="flex items-start">
                                    <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                    <span><strong>Better Error Handling:</strong> Built-in validation and fallbacks</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                    <span><strong>International Support:</strong> Multiple locales and formats</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                    <span><strong>Performance:</strong> Smart caching and optimization</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                    <span><strong>Type Safety:</strong> Full TypeScript support</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check text-blue-500 mt-0.5 mr-1.5 text-xs"></i>
                                    <span><strong>Future Proof:</strong> Active maintenance and updates</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer - Responsif -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-3 sm:px-4">
            <div class="max-w-6xl mx-auto">
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                        <div class="flex items-center space-x-2 mb-3">
                            <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                                <i class="fas fa-coins text-white"></i>
                            </div>
                            <div>
                                <div class="text-lg font-bold">RupiahFormatter</div>
                                <div class="text-xs text-gray-400">v1.2.0</div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-400">The most comprehensive Rupiah formatting solution for modern web applications.</p>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-semibold mb-2">Quick Links</h4>
                        <ul class="space-y-1 text-sm">
                            <li><a href="#features" class="text-gray-400 hover:text-white">Features</a></li>
                            <li><a href="#quickstart" class="text-gray-400 hover:text-white">Quick Start</a></li>
                            <li><a href="#demo" class="text-gray-400 hover:text-white">Live Demo</a></li>
                            <li><a href="#api" class="text-gray-400 hover:text-white">API Reference</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-semibold mb-2">Documentation</h4>
                        <ul class="space-y-1 text-sm">
                            <li><a href="#quickstart" class="text-gray-400 hover:text-white">Quick Start</a></li>
                            <li><a href="#advanced" class="text-gray-400 hover:text-white">Advanced Usage</a></li>
                            <li><a href="#performance" class="text-gray-400 hover:text-white">Performance Tips</a></li>
                            <li><a href="#api" class="text-gray-400 hover:text-white">API Reference</a></li>
                            <li><a href="#faq" class="text-gray-400 hover:text-white">FAQ</a></li>
                            <li><a href="#migration" class="text-gray-400 hover:text-white">Migration Guide</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-semibold mb-2">Install Now</h4>
                        <div class="bg-gray-800 rounded-lg overflow-hidden">
                            <pre class="text-xs font-mono p-3">npm install @devnovaa-id/new-rupiah-formatter</pre>
                        </div>
                        <button onclick="copyFooterCode()" class="w-full mt-2 bg-gray-800 hover:bg-gray-700 py-1.5 rounded-lg font-medium text-sm">
                            <i class="far fa-copy mr-1.5"></i> Copy Command
                        </button>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-4 mt-4">
                    <div class="flex flex-col sm:flex-row justify-between items-center">
                        <div class="text-xs text-gray-400 mb-3 sm:mb-0">
                            © 2025 DevNova-ID. MIT Licensed.
                        </div>
                        <div class="flex space-x-3">
                            <a href="https://github.com/devnovaa-id" target="_blank" class="text-gray-400 hover:text-white">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="https://devnova.icu" target="_blank" class="text-gray-400 hover:text-white">
                                <i class="fas fa-globe"></i>
                            </a>
                            <a href="mailto:this.key@devnova.icu" class="text-gray-400 hover:text-white">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('mobile-menu');
            const button = document.getElementById('mobile-menu-button');
            if (!menu.contains(event.target) && !button.contains(event.target)) {
                menu.classList.add('hidden');
            }
        });

        // Tab management
        function changeTab(tabName) {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'border-blue-600', 'text-gray-900');
                btn.classList.add('text-gray-600');
            });
            event.target.classList.add('active', 'border-blue-600', 'text-gray-900');
            event.target.classList.remove('text-gray-600');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${tabName}-tab`).classList.remove('hidden');
        }

        // Copy code function
        function copyCode(elementId) {
            const codeElement = document.getElementById(elementId);
            const code = codeElement.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const button = event.target.closest('button');
                if (button) {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.classList.add('text-green-400');
                    
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove('text-green-400');
                    }, 2000);
                }
            });
        }

        function copyFooterCode() {
            const code = 'npm install @devnovaa-id/new-rupiah-formatter';
            navigator.clipboard.writeText(code).then(() => {
                const button = event.target;
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check mr-1.5"></i> Copied!';
                button.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('bg-green-600', 'hover:bg-green-700');
                }, 2000);
            });
        }

        // Scroll to section
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Demo functionality
        let cacheHits = 0;
        let cacheMisses = 0;
        const formatCache = new Map();

        document.getElementById('demo-precision').addEventListener('input', function() {
            document.getElementById('precision-value').textContent = this.value;
        });

        function formatNumberManual(num, options) {
            const {
                symbol = 'Rp',
                decimalSeparator = ',',
                thousandSeparator = '.',
                precision = 2,
                spaceBetween = true,
                stripTrailingZero = true,
                isNegative = false
            } = options;
            
            let formattedNum = Math.abs(num).toFixed(precision);
            const [integer, decimal] = formattedNum.split('.');
            
            let formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
            let formattedDecimal = decimal || '';
            
            if (stripTrailingZero && decimal) {
                formattedDecimal = decimal.replace(/0+$/, '');
            }
            
            let result = formattedInteger;
            if (formattedDecimal) {
                result += decimalSeparator + formattedDecimal;
            }
            
            if (isNegative) {
                result = '-' + result;
            }
            
            const space = spaceBetween ? ' ' : '';
            return `${symbol}${space}${result}`;
        }

        function formatNumberWithCache(num, options) {
            const cacheKey = `${num}_${JSON.stringify(options)}`;
            
            if (formatCache.has(cacheKey)) {
                cacheHits++;
                return formatCache.get(cacheKey);
            }
            
            cacheMisses++;
            const result = formatNumberManual(num, options);
            
            if (formatCache.size >= 100) {
                const firstKey = Array.from(formatCache.keys())[0];
                formatCache.delete(firstKey);
            }
            
            formatCache.set(cacheKey, result);
            
            return result;
        }

        function updateMetrics() {
            const total = cacheHits + cacheMisses;
            const hitRate = total > 0 ? Math.round((cacheHits / total) * 100) : 0;
            
            document.getElementById('cache-hits').textContent = cacheHits;
            document.getElementById('cache-misses').textContent = cacheMisses;
            document.getElementById('cache-hit-rate').textContent = `${hitRate}%`;
            document.getElementById('cache-size').textContent = formatCache.size;
        }

        function runDemo() {
            const amount = parseFloat(document.getElementById('demo-amount').value) || 0;
            const symbol = document.getElementById('demo-symbol').value;
            const preset = document.getElementById('demo-preset').value;
            const precision = parseInt(document.getElementById('demo-precision').value);
            
            const presets = {
                standard: { stripTrailingZero: false, spaceBetween: true },
                compact: { stripTrailingZero: true, spaceBetween: false },
                international: { symbol: 'IDR', decimalSeparator: '.', thousandSeparator: ',' },
                ecommerce: { stripTrailingZero: true, spaceBetween: false, fallback: 'Gratis' },
                financial: { stripTrailingZero: false },
                mobile: { stripTrailingZero: true, spaceBetween: false, precision: 0 },
                crypto: { symbol: '', decimalSeparator: '.', thousandSeparator: ',', precision: 8 }
            };
            
            const presetConfig = presets[preset] || {};
            
            const options = {
                symbol: preset === 'international' ? 'IDR' : symbol,
                precision,
                ...presetConfig
            };
            
            const formatted = formatNumberWithCache(amount, options);
            document.getElementById('demo-output').textContent = formatted;
            
            let code = `import { formatRupiah } from '@devnovaa-id/new-rupiah-formatter';\n\n`;
            
            if (preset !== 'standard') {
                code += `// Using "${preset}" preset\n`;
                code += `formatRupiah(${amount}, { preset: '${preset}' });\n\n`;
                code += `// Equivalent custom options:\n`;
            }
            
            code += `formatRupiah(${amount}, {\n`;
            code += `  symbol: '${options.symbol}',\n`;
            code += `  precision: ${options.precision},\n`;
            code += `  spaceBetween: ${options.spaceBetween || true},\n`;
            code += `  stripTrailingZero: ${options.stripTrailingZero || false}`;
            if (options.fallback) code += `,\n  fallback: '${options.fallback}'`;
            code += `\n});`;
            
            const demoCodeElement = document.getElementById('demo-code');
            demoCodeElement.textContent = code;
            Prism.highlightElement(demoCodeElement);
            
            updateMetrics();
        }

        function copyDemoCode() {
            const code = document.getElementById('demo-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const button = event.target;
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check mr-1.5"></i> Copied!';
                button.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('bg-green-600', 'hover:bg-green-700');
                }, 2000);
            });
        }

        // FAQ Accordion functionality
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                // Toggle answer visibility
                answer.classList.toggle('hidden');
                
                // Rotate icon
                if (answer.classList.contains('hidden')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
                
                // Close other FAQs (optional)
                document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                    if (otherAnswer !== answer && !otherAnswer.classList.contains('hidden')) {
                        otherAnswer.classList.add('hidden');
                        const otherIcon = otherAnswer.previousElementSibling.querySelector('i');
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                    }
                });
            });
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            runDemo();
            document.querySelectorAll('pre code').forEach((block) => {
                Prism.highlightElement(block);
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#') {
                        e.preventDefault();
                        scrollToSection(href.substring(1));
                    }
                });
            });
            
            updateMetrics();
            
            // Auto-expand FAQ based on URL hash
            const hash = window.location.hash;
            if (hash === '#faq') {
                // Expand first FAQ by default when navigating to FAQ section
                const firstQuestion = document.querySelector('.faq-question');
                if (firstQuestion) {
                    setTimeout(() => firstQuestion.click(), 100);
                }
            }
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

## ✅ BACKUP SELESAI

Backup berhasil dibuat pada 24/12/2025, 18.44.41
