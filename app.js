/* ==========================================================================
   POLLO BAL - CLIENT SCRIPT & CONVERSION OPTIMIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Shrinking Header on Scroll
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // 2. Mobile Drawer Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-item');

    const openMenu = () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeMenu = () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    closeDrawer.addEventListener('click', closeMenu);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 3. Interactive History Timeline
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineSlides = document.querySelectorAll('.timeline-slide');

    timelineDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const year = dot.getAttribute('data-year');
            
            // Remove active class from all dots and slides
            timelineDots.forEach(d => d.classList.remove('active'));
            timelineSlides.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked dot and matching slide
            dot.classList.add('active');
            const targetSlide = document.querySelector(`.timeline-slide[data-year="${year}"]`);
            if (targetSlide) {
                targetSlide.classList.add('active');
            }
        });
    });

    // 4. Product Catalog Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and panel
            btn.classList.add('active');
            const targetPanel = document.querySelector(`.tab-panel[data-tab="${tabName}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Product Quote Click (Bridges catalog and contact form)
    const productQuoteButtons = document.querySelectorAll('.btn-product-quote');
    const interestSelector = document.getElementById('form-interes');

    productQuoteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Smoothly scroll to form instead of default link behavior
            e.preventDefault();
            const productName = btn.getAttribute('data-product');
            
            // Map product name to closest selector option
            if (productName.includes('Rosticero')) {
                interestSelector.value = 'Pollo Rosticero Calibrado';
            } else if (productName.includes('Pechuga Suprema') || productName.includes('Pechuga Deshuesada')) {
                interestSelector.value = 'Pechuga Suprema (Fileteada)';
            } else if (productName.includes('Alas Adobadas')) {
                interestSelector.value = 'Alas Adobadas Bal';
            } else if (productName.includes('Entero')) {
                interestSelector.value = 'Pollo Entero Fresco';
            } else if (productName.includes('Chorizo')) {
                interestSelector.value = 'Chorizo de Pollo Casero';
            } else {
                interestSelector.value = 'Otro / Consulta General';
            }

            // Fill message with context
            const messageTextarea = document.getElementById('form-mensaje');
            messageTextarea.value = `Hola, me interesa solicitar una cotización / pedido de: ${productName}. Quisiera saber los precios y disponibilidad de entrega para mi negocio.`;

            // Scroll to contact form
            const contactSection = document.getElementById('contacto');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 5. Dynamic Form Submission Exclusively to WhatsApp
    const form = document.getElementById('whatsapp-cotizador-form');
    const submitBtn = document.getElementById('form-submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent traditional submission

        // Collect fields
        const nombre = document.getElementById('form-nombre').value.trim();
        const tipoCliente = document.getElementById('form-tipo-cliente').value;
        const ciudad = document.getElementById('form-ciudad').value.trim();
        const interes = document.getElementById('form-interes').value;
        const mensaje = document.getElementById('form-mensaje').value.trim();

        // Validate basic inputs
        if (!nombre || !tipoCliente || !ciudad || !interes || !mensaje) {
            alert('Por favor complete todos los campos obligatorios (*).');
            return;
        }

        // WhatsApp corporate number: 753 537 3834 (Country code +52 for Mexico)
        const telefonoWhatsApp = '527535373834'; 

        // Structure a professional formatted message
        const textoWhatsApp = 
`🍗 *SOLICITUD DE COTIZACIÓN - POLLO BAL*
---------------------------------------
*Cliente:* ${nombre}
*Perfil:* ${tipoCliente}
*Ciudad:* ${ciudad}

*Producto de interés:*
👉 _${interes}_

*Mensaje y Requerimiento:*
"${mensaje}"
---------------------------------------
_Mensaje enviado desde la Landing Page de Pollo Bal_`;

        // URL encode the text for safety
        const textoEncriptado = encodeURIComponent(textoWhatsApp);
        
        // Build the direct wa.me URL
        const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${textoEncriptado}`;

        // Change button style temporarily to show feedback
        submitBtn.innerHTML = '<span>Redireccionando a WhatsApp...</span> ⏳';
        submitBtn.style.background = '#10B981'; // Green color for WhatsApp feel

        // Open in new tab/window
        setTimeout(() => {
            window.open(urlWhatsApp, '_blank');
            
            // Restore button style
            submitBtn.innerHTML = `<span>Enviar Pedido a WhatsApp</span>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
            submitBtn.style.background = '';
            
            // Optional: reset form
            form.reset();
        }, 800);
    });

    // 6. Scroll Reveal Animations (IntersectionObserver)
    const animateElements = document.querySelectorAll('.fade-in-el, .pillar-card, .bento-card, .sucursal-card');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                if (entry.target.classList.contains('fade-in-el')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        if (el.classList.contains('fade-in-el')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        revealOnScroll.observe(el);
    });

    // 7. Image Skeleton Loader Manager
    const productImages = document.querySelectorAll('.product-img');
    
    productImages.forEach(img => {
        const handleImageLoad = () => {
            img.classList.add('loaded');
            const loader = img.previousElementSibling;
            if (loader && loader.classList.contains('skeleton-loader')) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500); // Remove from DOM after transition finishes
            }
        };

        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener('load', handleImageLoad);
        }
    });

});
