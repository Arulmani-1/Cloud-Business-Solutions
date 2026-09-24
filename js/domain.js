// domain.js

document.addEventListener('DOMContentLoaded', () => {
    const domainForm = document.getElementById('domain-search-form');
    const resultsContainer = document.getElementById('domain-results');
    
    if (domainForm && resultsContainer) {
        domainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = document.getElementById('domain-input').value.trim().toLowerCase();
            const baseName = input.split('.')[0];
            
            if (!baseName) return;
            
            // Show loading
            resultsContainer.innerHTML = '<div class="col-span-full text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div><p class="mt-4 text-slate-500">Searching availability...</p></div>';
            resultsContainer.classList.remove('hidden');
            
            setTimeout(() => {
                const tlds = ['.com', '.net', '.org', '.co', '.in', '.ai'];
                let html = '';
                
                tlds.forEach((tld, index) => {
                    const isAvailable = Math.random() > 0.3; // Random availability
                    const price = (Math.random() * 20 + 5).toFixed(2);
                    
                    html += `
                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover-lift flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0" style="animation: fadeUp 0.5s ease forwards ${index * 0.1}s">
                            <div>
                                <h3 class="text-xl font-bold text-slate-900">${baseName}${tld}</h3>
                                <p class="text-sm ${isAvailable ? 'text-green-600' : 'text-red-500'} font-medium mt-1">
                                    ${isAvailable ? 'Available' : 'Taken'}
                                </p>
                            </div>
                            <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                ${isAvailable ? `<span class="text-lg font-bold text-slate-900">$${price}/yr</span>` : ''}
                                <button ${isAvailable ? 'onclick="window.location.href=\'404.html\'"' : ''} class="px-6 py-2 rounded-lg font-semibold transition-colors ${isAvailable ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}" ${!isAvailable ? 'disabled' : ''}>
                                    ${isAvailable ? 'Select' : 'Unavailable'}
                                </button>
                            </div>
                        </div>
                    `;
                });
                
                resultsContainer.innerHTML = html;
            }, 1200);
        });

        // Event listener for Select button clicks
        resultsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && btn.textContent.trim().toLowerCase() === 'select') {
                e.preventDefault();
                window.location.href = '404.html';
            }
        });
    }
});

// Add keyframe animation for dynamic results
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
