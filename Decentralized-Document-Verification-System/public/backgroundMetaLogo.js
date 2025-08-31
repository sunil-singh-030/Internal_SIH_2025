document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const connectButton = document.getElementById('connectButton');
    const walletStatusDiv = document.getElementById('wallet-status');
    const walletAddressSpan = document.getElementById('wallet-address');

    // This is specific to the home page, but we'll handle it gracefully
    const metamaskError = document.getElementById('metamask-error');

    // --- Theme Toggling Logic ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }


    // --- Wallet Connection Logic ---
    let provider, signer, userAddress;

    const updateUIForConnection = (address) => {
        userAddress = address;
        if (walletAddressSpan) {
            walletAddressSpan.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        }
        if (walletStatusDiv) {
            walletStatusDiv.classList.remove('hidden');
            walletStatusDiv.classList.add('flex');
        }
        if (connectButton) {
            connectButton.classList.add('hidden');
        }
    };

    const updateUIForDisconnection = () => {
        userAddress = null;
        if (walletStatusDiv) {
            walletStatusDiv.classList.add('hidden');
            walletStatusDiv.classList.remove('flex');
        }
        if (connectButton) {
            connectButton.classList.remove('hidden');
        }
    };

    // This function actively prompts the user to connect via popup.
    const requestWalletConnection = async () => {
        if (typeof window.ethereum === 'undefined') {
            console.error("MetaMask not detected.");
            if (metamaskError) {
                metamaskError.classList.remove('hidden');
            } else {
                alert("Please install MetaMask to use this dApp.");
            }
            return;
        }
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            // This line triggers the MetaMask pop-up
            const accounts = await provider.send("eth_requestAccounts", []);
            if (accounts.length > 0) {
                signer = provider.getSigner();
                updateUIForConnection(accounts[0]);
            } else {
                updateUIForDisconnection();
            }
        } catch (error) {
            console.error("Connection request was rejected:", error);
            updateUIForDisconnection();
        }
    };

    // This function silently checks if the wallet is already connected without a popup.
    // We are keeping this function here, but not using it on page load anymore.
    const checkSilentConnection = async () => {
        if (typeof window.ethereum === 'undefined') {
            console.log("MetaMask is not installed.");
            updateUIForDisconnection();
            return;
        }
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_accounts", []);
            if (accounts.length > 0) {
                signer = provider.getSigner();
                updateUIForConnection(accounts[0]);
            } else {
                console.log("Wallet not connected. Showing connect button.");
                updateUIForDisconnection();
            }
        } catch (err) {
            console.error("An error occurred while checking wallet connection:", err);
            updateUIForDisconnection();
        }
    };

    // Listen for wallet events provided by MetaMask.
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                updateUIForConnection(accounts[0]);
            } else {
                updateUIForDisconnection();
            }
        });
        window.ethereum.on('chainChanged', () => {
            // Reload the page to ensure the dApp is connected to the correct network
            window.location.reload();
        });
    }

    // --- Initialize Page ---

    // *MODIFICATION HERE*
    // Instead of silently checking, we now actively request connection on page load.
    requestWalletConnection();

    // Assign the active connection request to the button click event as a fallback.
    if (connectButton) {
        connectButton.addEventListener('click', requestWalletConnection);
    }
});