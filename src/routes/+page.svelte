<script>
    import { generateQR } from '$lib/appwrite';

    let text = '';
    let size = 400;
    let margin = 1;
    let qrCodeUrl = '';
    let isLoading = false;
    let error = '';

    async function generateQRCode() {
        if (!text.trim()) {
            error = 'Please enter some text to encode';
            return;
        }
        
        isLoading = true;
        error = '';
        
        try {
            const response = generateQR(text.trim(), size, margin, false);
            qrCodeUrl = response;
        } catch (err) {
            error = 'Failed to generate QR code. Please try again.';
            console.error('QR generation error:', err);
        } finally {
            isLoading = false;
        }
    }

    function downloadQR() {
        if (!qrCodeUrl) return;
        
        const link = document.createElement('a');
        link.href = generateQR(text.trim(), size, margin, true);
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function clearForm() {
        text = '';
        qrCodeUrl = '';
        error = '';
    }
</script>

<svelte:head>
    <title>QR Code Generator</title>
    <meta name="description" content="Generate custom QR codes with configurable options" />
</svelte:head>

<main class="container">
    <div class="header">
        <h1>🔳 QR Code Generator</h1>
        <p>Create custom QR codes with configurable size and margin options</p>
    </div>

    <div class="content">
        <div class="form-section">
            <form on:submit|preventDefault={generateQRCode} class="form">
                <div class="input-group">
                    <label for="text">Text to encode</label>
                    <textarea 
                        id="text" 
                        bind:value={text} 
                        placeholder="Enter URL, text, or any content..."
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div class="config-section">
                    <h3>Configuration Options</h3>
                    
                    <div class="config-grid">
                        <div class="input-group">
                            <label for="size">
                                Size
                                <span class="help-text">Width and height of the QR code (1-1000px)</span>
                            </label>
                            <input 
                                type="number" 
                                id="size"
                                bind:value={size}
                                min="1" 
                                max="1000"
                                step="1"
                                class="number-input"
                                placeholder="Enter size in pixels"
                            />
                        </div>

                        <div class="input-group">
                            <label for="margin">
                                Margin
                                <span class="help-text">White border around the QR code (0-10)</span>
                            </label>
                            <input 
                                type="number" 
                                id="margin" 
                                bind:value={margin}
                                min="0" 
                                max="10" 
                                step="1"
                                class="number-input"
                                placeholder="Enter margin value"
                            />
                        </div>
                    </div>
                </div>

                {#if error}
                    <div class="error">
                        ⚠️ {error}
                    </div>
                {/if}

                <div class="button-group">
                    <button type="submit" class="btn btn-primary" disabled={isLoading || !text.trim()}>
                        {#if isLoading}
                            <span class="spinner"></span>
                            Generating...
                        {:else}
                            🔳 Generate QR Code
                        {/if}
                    </button>
                    
                    <button type="button" class="btn btn-secondary" on:click={clearForm}>
                        🗑️ Clear
                    </button>
                </div>
            </form>
        </div>

        <div class="result-section">
            {#if qrCodeUrl}
                <div class="qr-result">
                    <h3>Your QR Code</h3>
                    <div class="qr-container">
                        <img 
                            src={qrCodeUrl} 
                            alt="QR Code for: {text}"
                            class="qr-image"
                            width={Math.min(size, 400)}
                            height={Math.min(size, 400)}
                        />
                    </div>
                    <button class="btn btn-download" on:click={downloadQR}>
                        💾 Download QR Code
                    </button>
                </div>
            {:else if !isLoading}
                <div class="placeholder">
                    <div class="placeholder-icon">🔳</div>
                    <h3>QR Code Preview</h3>
                    <p>Enter text and click "Generate QR Code" to see your QR code here</p>
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        height: auto;
        color: #333;
    }

    .container {
        max-width: 800px;
        max-height: 100%;
        height: auto;
        margin: 0 auto;
        padding: 3rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .header {
        text-align: center;
        margin-bottom: 3rem;
        color: white;
    }

    .header h1 {
        font-size: 3rem;
        margin: 0 0 1rem 0;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .header p {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        flex: 1;
    }

    .form-section {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        max-width: 100%;
        width: auto;
    }

    .result-section {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        max-width: 100%;
        width: auto;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: 600;
        color: #374151;
        font-size: 0.95rem;
    }

    .help-text {
        font-weight: 400;
        font-size: 0.8rem;
        color: #6b7280;
        display: block;
        margin-top: 0.25rem;
    }

    textarea {
        padding: 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.2s ease;
        resize: vertical;
        font-family: inherit;
    }

    textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .config-section {
        border-top: 2px solid #f3f4f6;
        padding-top: 1.5rem;
    }

    .config-section h3 {
        margin: 0 0 1rem 0;
        color: #374151;
        font-size: 1.1rem;
    }

    .config-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .number-input {
        padding: 0.75rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.2s ease;
        width: 100%;
        box-sizing: border-box;
    }

    .number-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .btn {
        padding: 1rem 1.5rem;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        flex: 1;
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    }

    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
    }

    .btn-secondary:hover {
        background: #e5e7eb;
        transform: translateY(-2px);
    }

    .btn-download {
        background: #10b981;
        color: white;
        width: 100%;
        margin-top: 1rem;
    }

    .btn-download:hover {
        background: #059669;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .error {
        background: #fef2f2;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid #fecaca;
        font-size: 0.9rem;
    }

    .qr-result {
        text-align: center;
    }

    .qr-result h3 {
        margin: 0 0 1.5rem 0;
        color: #374151;
    }

    .qr-container {
        background: #f9fafb;
        padding: 2rem;
        border-radius: 16px;
        border: 2px solid #e5e7eb;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .qr-image {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
    }

    .placeholder {
        text-align: center;
        padding: 3rem 1rem;
        color: #9ca3af;
    }

    .placeholder-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .placeholder h3 {
        margin: 0 0 1rem 0;
        color: #6b7280;
    }

    .placeholder p {
        margin: 0;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .container {
            padding: 2rem;
            max-width: 95vw;
        }
        
        .header {
            margin-bottom: 2rem;
        }
        
        .header h1 {
            font-size: 2.5rem;
        }
        
        .header p {
            font-size: 1rem;
        }
        
        .content {
            gap: 1.5rem;
        }
        
        .form-section, .result-section {
            padding: 1.5rem;
            border-radius: 16px;
        }
        
        .button-group {
            flex-direction: column;
        }
        
        .config-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
        }
        
        .qr-container {
            padding: 1.5rem;
        }
        
        .qr-image {
            max-width: min(300px, 90vw);
            max-height: min(300px, 90vw);
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 1rem;
            max-width: 95vw;
        }
        
        .header h1 {
            font-size: 2rem;
        }
        
        .header p {
            font-size: 0.9rem;
        }
        
        .form-section, .result-section {
            padding: 1rem;
            border-radius: 12px;
        }
        
        .btn {
            padding: 0.875rem 1.25rem;
            font-size: 0.95rem;
        }
        
        .qr-container {
            padding: 1rem;
        }
        
        .qr-image {
            max-width: min(250px, 85vw);
            max-height: min(250px, 85vw);
        }
    }
</style>