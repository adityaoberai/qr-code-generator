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

<main>
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