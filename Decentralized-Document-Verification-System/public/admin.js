let provider, signer, contract;
const contractAddress = "0x80f4552f7a1180026757bacddb8eeebd254a09b6";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "addInstitute",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "rollNo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "docHash",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					}
				],
				"internalType": "struct InstaVerify30.StudentInput[]",
				"name": "inputs",
				"type": "tuple[]"
			}
		],
		"name": "addMultipleStudentDocuments",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "docHash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			}
		],
		"name": "addStudentDocument",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "BulkStudentDocumentsAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "InstituteAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "InstituteRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "reactivateInstitute",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "revokeInstitute",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cid",
				"type": "string"
			}
		],
		"name": "StudentDocumentAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllInstitutes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "wallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					}
				],
				"internalType": "struct InstaVerify30.Institute[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			}
		],
		"name": "getDocumentCIDs",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "getInstituteInfo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			}
		],
		"name": "getStudentInfo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "institute",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalDocs",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalDocuments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalInstitutes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalStudents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "instituteDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "instituteNames",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "institutes",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDocuments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalInstitutes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStudents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "rollNo",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "docHash",
				"type": "bytes32"
			}
		],
		"name": "verifyDocument",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const authLayer = document.getElementById('admin-auth-layer');
const authMessage = document.getElementById('auth-message');

async function init() {
    if (typeof window.ethereum === "undefined") {
        showAuthError("MetaMask is not installed. Please install it to continue.");
        return;
    }
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        const connectedAddress = await signer.getAddress();
        const ownerAddress = await contract.owner();

        if (ethers.utils.getAddress(connectedAddress) !== ethers.utils.getAddress(ownerAddress)) {
            showAuthError("Access Denied: You are not the contract owner.");
            return;
        }

        authLayer.style.display = 'none';
        loadDashboardData();

    } catch (error) {
        console.error("Initialization failed:", error);
        showAuthError("Failed to connect wallet or contract. See console for details.");
    }
}

function showAuthError(message) {
    authMessage.textContent = message;
    authMessage.classList.add('error');
}

async function loadDashboardData() {
    await fetchStats();
    await fetchInstituteDetails();
}

// ---------------- Fetch Stats ----------------
async function fetchStats() {
    try {
        const totalInstitutes = await contract.getTotalInstitutes();
        const totalDocuments = await contract.getTotalDocuments();
        const totalStudents = await contract.getTotalStudents();

        document.getElementById('total-institutes').textContent = totalInstitutes.toString();
        document.getElementById('total-documents').textContent = totalDocuments.toString();
        document.getElementById('total-students').textContent = totalStudents.toString();
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        alert("Could not fetch dashboard statistics.");
    }
}

// ---------------- Fetch Institute Details ----------------
async function fetchInstituteDetails() {
    const tbody = document.getElementById('requests-tbody');
    tbody.innerHTML = '<tr><td colspan="3">Loading institutes...</td></tr>';

    try {
        const institutes = await contract.getAllInstitutes();
        tbody.innerHTML = "";

        if (institutes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3">No institutes registered.</td></tr>';
            return;
        }

        // ----------------- Filter duplicates by wallet -----------------
        const uniqueInstitutes = Array.from(
            new Map(institutes.map(inst => [inst.wallet, inst])).values()
        );

        uniqueInstitutes.forEach(inst => {
            const btnText = inst.isActive ? "Deactivate" : "Activate";
            const btnClass = inst.isActive ? "deactivate-btn" : "activate-btn";

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${inst.name}</td>
                <td>${inst.wallet}</td>
                <td>
                    <button class="${btnClass}" data-wallet="${inst.wallet}">${btnText}</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add click event listeners for all buttons
        document.querySelectorAll('#requests-tbody button').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const wallet = e.target.dataset.wallet;
                e.target.disabled = true;
                e.target.textContent = "Processing...";

                try {
                    if (e.target.classList.contains('deactivate-btn')) {
						const tx = await contract.revokeInstitute(wallet);
						await tx.wait();
						alert(`✅ Institute revoked successfully`);
					} else {
						// Reactivate institute without calling addInstitute()
						const tx = await contract.reactivateInstitute(wallet); // create this function in Solidity
						await tx.wait();
						alert(`✅ Institute reactivated successfully`);
					}

					// Refresh table after update
					fetchInstituteDetails();
                } catch (error) {
                    console.error("Status update failed:", error);
                    alert("❌ Transaction failed. See console for details.");
                    e.target.disabled = false;
                    e.target.textContent = e.target.classList.contains('deactivate-btn') ? "Deactivate" : "Activate";
                }
            });
        });

    } catch (error) {
        console.error("Failed to fetch institutes:", error);
        tbody.innerHTML = '<tr><td colspan="3" style="color:red;">Error loading institutes</td></tr>';
    }
}


// ---------------- Initialize ----------------
init();
