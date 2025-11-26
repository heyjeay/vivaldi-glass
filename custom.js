// Vivaldi Custom JS - Auto-hide Address Bar with Glassmorphism
(function () {
    'use strict';

    // Function to remove accent colors and block Vivaldi styles from favicon area - ALL ACTIVE TABS
    function removeFaviconAccentColors() {
        // Target ALL active tabs, not just audible ones
        const tabs = document.querySelectorAll('.tab.active');
        
        tabs.forEach(tab => {
            // Find all favicon/icon related elements
            const faviconElements = tab.querySelectorAll('.tab-icon, .tab-favicon, .favicon, .tab-position, .tab-position *, .tab-header .tab-position, .tab-header .tab-position *');
            
            faviconElements.forEach(el => {
                // Remove all background styles
                el.style.background = 'transparent';
                el.style.backgroundColor = 'transparent';
                el.style.backgroundImage = 'none';
                el.style.border = 'none';
                el.style.boxShadow = 'none';
                el.style.outline = 'none';
                el.style.stroke = 'none';
                el.style.strokeWidth = '0';
                el.style.backdropFilter = 'none';
                el.style.webkitBackdropFilter = 'none';
                el.style.filter = 'none';
                el.style.webkitFilter = 'none';
                el.style.textDecoration = 'none';
                
                // Remove any CSS variable backgrounds
                const computedStyle = window.getComputedStyle(el);
                const bgColor = computedStyle.backgroundColor;
                if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && 
                    bgColor !== 'transparent' && 
                    bgColor !== 'rgba(200, 200, 200, 0.03)') {
                    el.style.backgroundColor = 'transparent';
                }
            });
            
            // Completely hide all audio indicators - force hide them
            const audioIndicators = tab.querySelectorAll('.tab-audio, .tab-audio-indicator, .audio-indicator, [class*="audio"], [class*="Audio"], [class*="speaker"], [class*="Speaker"]');
            audioIndicators.forEach(el => {
                // Force hide completely
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.width = '0';
                el.style.height = '0';
                el.style.overflow = 'hidden';
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                // Remove all background and border styles
                el.style.background = 'transparent';
                el.style.backgroundColor = 'transparent';
                el.style.backgroundImage = 'none';
                el.style.border = 'none';
                el.style.boxShadow = 'none';
                el.style.outline = 'none';
                el.style.padding = '0';
                el.style.margin = '0';
                el.style.borderRadius = '0';
                // Also check parent elements
                let parent = el.parentElement;
                if (parent && !parent.classList.contains('tab-header')) {
                    parent.style.background = 'transparent';
                    parent.style.backgroundColor = 'transparent';
                    parent.style.border = 'none';
                    parent.style.boxShadow = 'none';
                }
            });
            
            // Ensure favicon stays visible
            const favicons = tab.querySelectorAll('.tab-favicon, .tab-icon, .favicon');
            favicons.forEach(favicon => {
                favicon.style.display = 'block';
                favicon.style.visibility = 'visible';
                favicon.style.opacity = '1';
                favicon.style.transform = 'none';
                favicon.style.animation = 'none';
                favicon.style.transition = 'none';
            });
            
            // Block all Vivaldi color CSS variables
            tab.style.setProperty('--accent-color', 'transparent', 'important');
            tab.style.setProperty('--accent-rgb', '0, 0, 0', 'important');
            tab.style.setProperty('--accent', 'transparent', 'important');
            tab.style.setProperty('--colorAccentBg', 'transparent', 'important');
            tab.style.setProperty('--colorAccentFg', 'transparent', 'important');
            tab.style.setProperty('--colorAccent', 'transparent', 'important');
            tab.style.setProperty('--colorTabBg', 'transparent', 'important');
            tab.style.setProperty('--colorTabBgActive', 'transparent', 'important');
            tab.style.setProperty('--colorTabFg', 'transparent', 'important');
            tab.style.setProperty('--colorTabFgActive', 'transparent', 'important');
        });
    }

    // Watch for accent color changes and remove them
    function initFaviconAccentRemoval() {
        // Run immediately
        removeFaviconAccentColors();
        
        // Watch for tab changes
        const observer = new MutationObserver(() => {
            removeFaviconAccentColors();
        });
        
        // Observe the tab strip for changes
        const tabStrip = document.querySelector('.tab-strip');
        if (tabStrip) {
            observer.observe(tabStrip, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
        
        // Also observe individual tabs
        document.querySelectorAll('.tab').forEach(tab => {
            observer.observe(tab, {
                attributes: true,
                attributeFilter: ['class', 'style', 'audible'],
                subtree: true
            });
        });
        
        // Run periodically as backup - more frequent to catch dynamic changes
        setInterval(removeFaviconAccentColors, 50);
        
        console.log('✓ Favicon accent color removal initialized');
    }

    function initAutoHideAddressBar() {
        // Wait for the DOM to be ready
        const checkInterval = setInterval(() => {
            const addressBar = document.querySelector('.toolbar-addressbar');
            const header = document.querySelector('#header');

            if (addressBar && header) {
                clearInterval(checkInterval);

                // Find all child elements that need to be hidden
                const urlBar = addressBar.querySelector('.UrlBar');
                const toolbar = addressBar.querySelector('.toolbar');
                const allChildren = addressBar.querySelectorAll('*');

                // Store original display value
                const originalDisplay = addressBar.style.display || window.getComputedStyle(addressBar).display || 'block';
                
                // Get the actual height of the address bar for smooth animation
                let addressBarHeight = 0;
                const measureHeight = () => {
                    addressBar.style.display = originalDisplay;
                    addressBar.style.visibility = 'hidden';
                    addressBar.style.maxHeight = 'none';
                    addressBar.style.transform = 'none';
                    addressBarHeight = addressBar.offsetHeight;
                    addressBar.style.visibility = '';
                };
                measureHeight();
                
                // Animation duration
                const animationDuration = 300; // milliseconds
                
                // Function to hide address bar with slide-up animation
                const hideAddressBar = () => {
                    // Only animate if not already hidden
                    if (addressBar.classList.contains('addressbar-hidden')) {
                        return;
                    }
                    
                    // Check if already hidden via display
                    const computedStyle = window.getComputedStyle(addressBar);
                    if (computedStyle.display === 'none') {
                        addressBar.classList.add('addressbar-hidden');
                        return;
                    }
                    
                    // Mark as hiding to prevent multiple calls
                    addressBar.classList.add('addressbar-hiding');
                    
                    // Ensure element is visible and has proper display
                    addressBar.style.display = originalDisplay;
                    addressBar.style.visibility = 'visible';
                    
                    // Get current actual height - measure it properly
                    let heightToUse = addressBar.offsetHeight;
                    if (heightToUse === 0) {
                        // If height is 0, temporarily show to measure
                        addressBar.style.maxHeight = 'none';
                        addressBar.style.height = 'auto';
                        heightToUse = addressBar.offsetHeight || addressBarHeight;
                    }
                    
                    // Reset all styles to ensure clean state
                    addressBar.style.padding = '';
                    addressBar.style.margin = '';
                    addressBar.style.background = '';
                    addressBar.style.backgroundColor = '';
                    
                    // Set starting state explicitly
                    addressBar.style.maxHeight = heightToUse + 'px';
                    addressBar.style.opacity = '1';
                    addressBar.style.transform = 'translateY(0) scale(1)';
                    addressBar.style.pointerEvents = 'auto';
                    addressBar.style.overflow = 'hidden';
                    addressBar.style.height = 'auto';
                    
                    // Remove transition temporarily to set initial state
                    addressBar.style.transition = 'none';
                    
                    // Force reflow - this is critical for animation to work
                    void addressBar.offsetHeight;
                    
                    // Small delay to ensure initial state is rendered
                    setTimeout(() => {
                        // NOW set transitions
                        addressBar.style.transition = `max-height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                        
                        // Force another reflow
                        void addressBar.offsetHeight;
                        
                        // Use requestAnimationFrame to trigger animation
                        requestAnimationFrame(() => {
                            // Now trigger the hide animation
                            addressBar.style.maxHeight = '0';
                            addressBar.style.opacity = '0';
                            addressBar.style.transform = 'translateY(-15px) scale(0.98)';
                            addressBar.style.pointerEvents = 'none';
                        });
                    }, 10);
                    
                    // After animation completes, set display: none and mark as hidden
                    setTimeout(() => {
                        addressBar.classList.remove('addressbar-hiding');
                        addressBar.classList.add('addressbar-hidden');
                        addressBar.style.display = 'none';
                        addressBar.style.visibility = 'hidden';
                    }, animationDuration + 50);
                    
                    // Also hide status bar when address bar hides
                    if (window.hideStatusBar) {
                        window.hideStatusBar();
                    }
                };

                // Function to show address bar with slide-down animation
                const showAddressBar = () => {
                    // If already visible and not hidden, don't re-animate
                    if (!addressBar.classList.contains('addressbar-hidden') && 
                        !addressBar.classList.contains('addressbar-hiding') &&
                        addressBar.style.display !== 'none' && 
                        addressBar.style.opacity === '1') {
                        // Still show status bar if address bar is visible
                        if (window.showStatusBar) {
                            window.showStatusBar();
                        }
                        return; // Already visible
                    }
                    
                    // Remove hiding/hidden classes
                    addressBar.classList.remove('addressbar-hidden', 'addressbar-hiding');
                    
                    // First, restore display and set initial hidden state
                    addressBar.style.display = originalDisplay;
                    addressBar.style.visibility = 'visible';
                    addressBar.style.maxHeight = '0';
                    addressBar.style.opacity = '0';
                    addressBar.style.transform = 'translateY(-15px) scale(0.98)';
                    addressBar.style.pointerEvents = 'none';
                    addressBar.style.overflow = 'visible'; // Changed to visible so dropdowns can show
                    addressBar.style.padding = '';
                    addressBar.style.margin = '';
                    addressBar.style.background = '';
                    addressBar.style.backgroundColor = '';
                    
                    // Remove transition temporarily
                    addressBar.style.transition = 'none';
                    
                    // Force reflow to ensure initial state is applied
                    void addressBar.offsetHeight;
                    
                    // Small delay then set transitions and animate
                    setTimeout(() => {
                        addressBar.style.transition = `max-height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                        void addressBar.offsetHeight;
                        
                        // Then animate to visible state
                        requestAnimationFrame(() => {
                            addressBar.style.maxHeight = addressBarHeight + 'px';
                            addressBar.style.opacity = '1';
                            addressBar.style.transform = 'translateY(0) scale(1)';
                            addressBar.style.pointerEvents = 'auto';
                            addressBar.style.overflow = 'visible'; // Keep overflow visible for dropdowns
                        });
                    }, 10);
                    
                    // Also show status bar when address bar shows
                    if (window.showStatusBar) {
                        window.showStatusBar();
                    }
                };

                // Set smooth transitions for animation (default, will be overridden in show/hide functions)
                addressBar.style.transition = `max-height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), scale ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

                // Function to focus the address bar
                const focusAddressBar = () => {
                    // Try multiple selectors to find the URL input
                    const urlInput = addressBar.querySelector('input[type="text"], input[type="url"], .UrlBar input, .addressfield input, #addressfield input');
                    if (urlInput) {
                        // Small delay to ensure address bar is visible first
                        setTimeout(() => {
                            urlInput.focus();
                            urlInput.select(); // Select any existing text
                        }, 100);
                    }
                };

                // Initially hide the address bar
                hideAddressBar();

                let hideTimeout;
                let showTimestamp = 0;
                const minShowDuration = 10000; // 10 seconds in milliseconds

                // Function to check if we can hide (10 seconds must have passed since showing)
                const canHide = () => {
                    const timeSinceShow = Date.now() - showTimestamp;
                    return timeSinceShow >= minShowDuration;
                };

                // Function to check if address bar or any input is focused
                const isAddressBarFocused = () => {
                    const activeElement = document.activeElement;
                    if (!activeElement) return false;
                    
                    // Check if URL bar is focused
                    if (urlBar && (activeElement === urlBar || 
                        (urlBar.contains && urlBar.contains(activeElement)))) {
                        return true;
                    }
                    
                    // Check if any input in address bar is focused
                    const addressBarInputs = addressBar.querySelectorAll('input, textarea');
                    for (let input of addressBarInputs) {
                        if (activeElement === input || input.contains(activeElement)) {
                            return true;
                        }
                    }
                    
                    // Check if active element is within address bar
                    if (activeElement.closest && activeElement.closest('.toolbar-addressbar')) {
                        return true;
                    }
                    
                    return false;
                };

                // Function to attempt hiding (only if 10 seconds have passed and not focused)
                const attemptHide = () => {
                    // Don't hide if address bar is focused
                    if (isAddressBarFocused()) {
                        return;
                    }
                    
                    if (canHide()) {
                        hideAddressBar();
                    } else {
                        // Schedule another attempt after remaining time
                        const remainingTime = minShowDuration - (Date.now() - showTimestamp);
                        if (remainingTime > 0) {
                            hideTimeout = setTimeout(() => {
                                attemptHide();
                            }, remainingTime);
                        }
                    }
                };

                // Periodic check to hide address bar after 10 seconds (every second)
                setInterval(() => {
                    // Only check if address bar is currently visible
                    const isVisible = !addressBar.classList.contains('addressbar-hidden') && 
                                     addressBar.style.display !== 'none' &&
                                     addressBar.style.opacity !== '0';
                    
                    if (isVisible && canHide() && !isAddressBarFocused()) {
                        hideAddressBar();
                    }
                }, 1000); // Check every second

                // Show address bar on header hover
                header.addEventListener('mouseenter', () => {
                    clearTimeout(hideTimeout);
                    showTimestamp = Date.now();
                    showAddressBar();
                });

                // Hide address bar when mouse leaves (only after 10 seconds)
                header.addEventListener('mouseleave', () => {
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        attemptHide();
                    }, 300);
                });

                // Keep visible when hovering over address bar itself
                addressBar.addEventListener('mouseenter', () => {
                    clearTimeout(hideTimeout);
                    showTimestamp = Date.now();
                    showAddressBar();
                });

                addressBar.addEventListener('mouseleave', () => {
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        attemptHide();
                    }, 300);
                });

                // Keep address bar visible when it's focused (user is typing/searching)
                // urlBar is already declared above, reuse it
                if (urlBar) {
                    // Show when URL bar gets focus
                    urlBar.addEventListener('focus', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);

                    // Keep visible while typing
                    urlBar.addEventListener('input', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);

                    // Keep visible on any key press
                    urlBar.addEventListener('keydown', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);
                    
                    // Also on keyup
                    urlBar.addEventListener('keyup', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);
                    
                    // Keep visible while focused - simple check without freezing
                    const keepVisibleWhileFocused = () => {
                        try {
                            const activeElement = document.activeElement;
                            if (activeElement === urlBar || 
                                (urlBar && urlBar.contains && urlBar.contains(activeElement)) ||
                                (activeElement && activeElement.closest && activeElement.closest('.toolbar-addressbar'))) {
                                clearTimeout(hideTimeout);
                                showTimestamp = Date.now();
                                // Only call showAddressBar if it's actually hidden
                                if (addressBar.classList.contains('addressbar-hidden') || addressBar.style.display === 'none') {
                                    showAddressBar();
                                }
                            }
                        } catch (err) {
                            // Silently handle errors
                        }
                    };
                    
                    // Check if focused periodically - less frequent to prevent freezing
                    setInterval(keepVisibleWhileFocused, 500); // Check every 500ms
                }

                // Also check for any input/textarea elements in address bar
                const addressBarInputs = addressBar.querySelectorAll('input, textarea');
                addressBarInputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);
                    input.addEventListener('input', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);
                    input.addEventListener('keydown', () => {
                        clearTimeout(hideTimeout);
                        showTimestamp = Date.now();
                        showAddressBar();
                    }, true);
                });

                // Keep visible when address bar or its children are clicked
                addressBar.addEventListener('click', (e) => {
                    clearTimeout(hideTimeout);
                    showTimestamp = Date.now();
                    showAddressBar();
                }, true); // Use capture phase to catch all clicks

                // Keep address bar visible when URL bar is focused - this handles typing
                // The focus/input/keydown events above should be sufficient
                // No need for expensive dropdown checking that causes freezing

                // Show and focus address bar when a new tab is created
                const handleNewTab = () => {
                    clearTimeout(hideTimeout);
                    showTimestamp = Date.now();
                    showAddressBar();
                    // Focus the address bar after showing
                    setTimeout(() => {
                        focusAddressBar();
                    }, 150);
                };

                // Watch for new tab creation
                const tabStrip = document.querySelector('.tab-strip');
                if (tabStrip) {
                    const tabObserver = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            // Check if a new tab was added
                            if (mutation.addedNodes.length > 0) {
                                mutation.addedNodes.forEach((node) => {
                                    if (node.nodeType === 1 && (node.classList.contains('tab') || node.querySelector('.tab'))) {
                                        // New tab detected, show and focus address bar
                                        handleNewTab();
                                    }
                                });
                            }
                        });
                    });
                    
                    tabObserver.observe(tabStrip, {
                        childList: true,
                        subtree: true
                    });
                }

                // Watch for tab activation (when a tab becomes active)
                const checkActiveTab = () => {
                    const activeTab = document.querySelector('.tab.active');
                    if (activeTab) {
                        // Check if it's a new/empty tab
                        const tabTitle = activeTab.querySelector('.tab-title')?.textContent?.trim();
                        const tabUrl = activeTab.getAttribute('data-url') || '';
                        // Check if it's a new tab (empty, "New Tab", or about:blank)
                        if (!tabTitle || tabTitle === '' || 
                            tabTitle.toLowerCase().includes('new tab') || 
                            tabUrl === 'about:blank' || 
                            tabUrl === '' ||
                            tabUrl === 'vivaldi://newtab/') {
                            handleNewTab();
                        }
                    }
                };

                // Watch for tab activation via MutationObserver
                if (tabStrip) {
                    const activeTabObserver = new MutationObserver(() => {
                        checkActiveTab();
                    });
                    
                    activeTabObserver.observe(tabStrip, {
                        attributes: true,
                        attributeFilter: ['class'],
                        subtree: true
                    });
                }

                // Also listen for clicks on tabs
                document.addEventListener('click', (e) => {
                    // Check if clicking on a tab or tab button
                    const tab = e.target.closest('.tab, .tab-button, button[title*="New Tab"], button[title*="new tab"]');
                    if (tab) {
                        setTimeout(checkActiveTab, 50);
                    }
                }, true);

                // Listen for keyboard shortcuts (Ctrl+T / Cmd+T for new tab)
                document.addEventListener('keydown', (e) => {
                    // Check for Ctrl+T (Windows/Linux) or Cmd+T (Mac)
                    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                        // New tab shortcut detected
                        setTimeout(() => {
                            handleNewTab();
                        }, 100);
                    }
                }, true);

                console.log('✓ Auto-hide address bar initialized');
            }
        }, 100);

        // Stop checking after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
    }

    function initAutoHideStatusBar() {
        // Wait for the DOM to be ready
        const checkInterval = setInterval(() => {
            const statusBar = document.querySelector('#footer');

            if (statusBar) {
                clearInterval(checkInterval);

                // Store original display value
                const originalDisplay = statusBar.style.display || window.getComputedStyle(statusBar).display || 'block';
                
                // Get the actual height of the status bar for smooth animation
                let statusBarHeight = 0;
                const measureHeight = () => {
                    statusBar.style.display = originalDisplay;
                    statusBar.style.visibility = 'hidden';
                    statusBar.style.maxHeight = 'none';
                    statusBar.style.transform = 'none';
                    statusBarHeight = statusBar.offsetHeight;
                    statusBar.style.visibility = '';
                };
                measureHeight();
                
                // Animation duration
                const animationDuration = 300; // milliseconds
                
                // Function to hide status bar with slide-down animation
                const hideStatusBar = () => {
                    // Only animate if not already hidden
                    if (statusBar.classList.contains('statusbar-hidden')) {
                        return;
                    }
                    
                    // Check if already hidden via display
                    const computedStyle = window.getComputedStyle(statusBar);
                    if (computedStyle.display === 'none') {
                        statusBar.classList.add('statusbar-hidden');
                        return;
                    }
                    
                    // Mark as hiding to prevent multiple calls
                    statusBar.classList.add('statusbar-hiding');
                    
                    // Ensure element is visible and has proper display
                    statusBar.style.display = originalDisplay;
                    statusBar.style.visibility = 'visible';
                    
                    // Get current actual height - measure it properly
                    let heightToUse = statusBar.offsetHeight;
                    if (heightToUse === 0) {
                        // If height is 0, temporarily show to measure
                        statusBar.style.maxHeight = 'none';
                        statusBar.style.height = 'auto';
                        heightToUse = statusBar.offsetHeight || statusBarHeight;
                    }
                    
                    // Reset all styles to ensure clean state
                    statusBar.style.padding = '';
                    statusBar.style.margin = '';
                    statusBar.style.background = '';
                    statusBar.style.backgroundColor = '';
                    
                    // Set starting state explicitly
                    statusBar.style.maxHeight = heightToUse + 'px';
                    statusBar.style.opacity = '1';
                    statusBar.style.transform = 'translateY(0) scale(1)';
                    statusBar.style.pointerEvents = 'auto';
                    statusBar.style.overflow = 'hidden';
                    statusBar.style.height = 'auto';
                    
                    // Remove transition temporarily to set initial state
                    statusBar.style.transition = 'none';
                    
                    // Force reflow - this is critical for animation to work
                    void statusBar.offsetHeight;
                    
                    // Small delay to ensure initial state is rendered
                    setTimeout(() => {
                        // NOW set transitions
                        statusBar.style.transition = `max-height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                        
                        // Force another reflow
                        void statusBar.offsetHeight;
                        
                        // Use requestAnimationFrame to trigger animation
                        requestAnimationFrame(() => {
                            // Now trigger the hide animation
                            statusBar.style.maxHeight = '0';
                            statusBar.style.opacity = '0';
                            statusBar.style.transform = 'translateY(15px) scale(0.98)';
                            statusBar.style.pointerEvents = 'none';
                        });
                    }, 10);
                    
                    // After animation completes, set display: none and mark as hidden
                    setTimeout(() => {
                        statusBar.classList.remove('statusbar-hiding');
                        statusBar.classList.add('statusbar-hidden');
                        statusBar.style.display = 'none';
                        statusBar.style.visibility = 'hidden';
                    }, animationDuration + 50);
                };

                // Function to show status bar with slide-up animation
                const showStatusBar = () => {
                    // Only show if not already visible
                    if (!statusBar.classList.contains('statusbar-hidden') && 
                        !statusBar.classList.contains('statusbar-hiding') &&
                        statusBar.style.display !== 'none' && 
                        statusBar.style.opacity === '1') {
                        return; // Already visible
                    }
                    
                    // Remove hiding/hidden classes
                    statusBar.classList.remove('statusbar-hidden', 'statusbar-hiding');
                    
                    // First, restore display and set initial hidden state
                    statusBar.style.display = originalDisplay;
                    statusBar.style.visibility = 'visible';
                    statusBar.style.maxHeight = '0';
                    statusBar.style.opacity = '0';
                    statusBar.style.transform = 'translateY(15px) scale(0.98)';
                    statusBar.style.pointerEvents = 'none';
                    statusBar.style.overflow = 'hidden';
                    statusBar.style.padding = '';
                    statusBar.style.margin = '';
                    statusBar.style.background = '';
                    statusBar.style.backgroundColor = '';
                    
                    // Remove transition temporarily
                    statusBar.style.transition = 'none';
                    
                    // Force reflow to ensure initial state is applied
                    void statusBar.offsetHeight;
                    
                    // Small delay then set transitions and animate
                    setTimeout(() => {
                        statusBar.style.transition = `max-height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                        void statusBar.offsetHeight;
                        
                        // Then animate to visible state
                        requestAnimationFrame(() => {
                            statusBar.style.maxHeight = statusBarHeight + 'px';
                            statusBar.style.opacity = '1';
                            statusBar.style.transform = 'translateY(0) scale(1)';
                            statusBar.style.pointerEvents = 'auto';
                        });
                    }, 10);
                };

                // Set smooth transitions for animation (default, will be overridden in show/hide functions)
                statusBar.style.transition = `max-height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), scale ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

                // Initially hide the status bar
                setTimeout(() => {
                    hideStatusBar();
                }, 500);

                // Export functions to global scope so address bar can call them
                window.showStatusBar = showStatusBar;
                window.hideStatusBar = hideStatusBar;

                console.log('✓ Status bar initialized - connected to address bar');
            }
        }, 100);

        // Stop checking after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
    }

    // Function to disable animations on audible tabs
    function disableAudibleTabAnimations() {
        const audibleTabs = document.querySelectorAll('.tab.active.audible, .tab.active[audible], .tab.active.playing, .tab.active[playing]');
        
        audibleTabs.forEach(tab => {
            // Disable animations on tab itself
            tab.style.animation = 'none';
            tab.style.webkitAnimation = 'none';
            tab.style.transition = 'none';
            tab.style.transform = 'none';
            tab.style.scale = '1 1';
            tab.style.willChange = 'auto';
            
            // Disable on all children
            const allChildren = tab.querySelectorAll('*');
            allChildren.forEach(child => {
                child.style.animation = 'none';
                child.style.webkitAnimation = 'none';
                child.style.transition = 'none';
                child.style.transform = 'none';
                child.style.scale = '1 1';
                child.style.willChange = 'auto';
            });
            
            // Specifically target tab-header
            const tabHeader = tab.querySelector('.tab-header');
            if (tabHeader) {
                tabHeader.style.animation = 'none';
                tabHeader.style.webkitAnimation = 'none';
                tabHeader.style.transition = 'none';
                tabHeader.style.transform = 'none';
                tabHeader.style.scale = '1 1';
                tabHeader.style.willChange = 'auto';
            }
            
            // Target audio indicators
            const audioIndicators = tab.querySelectorAll('.tab-audio, .tab-audio-indicator, .audio-indicator');
            audioIndicators.forEach(indicator => {
                indicator.style.animation = 'none';
                indicator.style.webkitAnimation = 'none';
                indicator.style.transition = 'none';
                indicator.style.transform = 'none';
                indicator.style.scale = '1 1';
            });
        });
    }

    // Watch for audible tabs and disable animations
    function initDisableAudibleAnimations() {
        // Run immediately
        disableAudibleTabAnimations();
        
        // Watch for tab changes
        const observer = new MutationObserver(() => {
            disableAudibleTabAnimations();
        });
        
        // Observe the tab strip for changes
        const tabStrip = document.querySelector('.tab-strip');
        if (tabStrip) {
            observer.observe(tabStrip, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style', 'audible']
            });
        }
        
        // Also observe individual tabs
        document.querySelectorAll('.tab').forEach(tab => {
            observer.observe(tab, {
                attributes: true,
                attributeFilter: ['class', 'style', 'audible'],
                subtree: true
            });
        });
        
        // Run periodically as backup
        setInterval(disableAudibleTabAnimations, 50);
        
        console.log('✓ Audible tab animation disable initialized');
    }

    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAutoHideAddressBar();
            initAutoHideStatusBar();
            initFaviconAccentRemoval();
            initDisableAudibleAnimations();
        });
    } else {
        initAutoHideAddressBar();
        initAutoHideStatusBar();
        initFaviconAccentRemoval();
        initDisableAudibleAnimations();
    }
})();
