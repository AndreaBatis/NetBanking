let showDetails = true
let accountbalance = 950.00

updatebalance()

function showHideDetails() {
    showDetails = !showDetails

  if(showDetails) {
    document.getElementById('account-number').innerText = 'Account Number:414655555834'
    document.getElementById('account-balance').innerText = '$950.00'
    document.getElementById('eye-icon').src='assets/Fliis.png'
  }
  else {
    document.getElementById('account-number').innerText = 'Account Number: *******5834'
    document.getElementById('account-balance').innerText = '$*****'
    document.getElementById('eye-icon').src='assets/Fliis.png'
     }
 }
function deposit() {
    const depositType = document.getElementById('deposit-type').value 
    const depositAmount = Number(document.getElementById('deposit-amount').value)
    accountbalance = accountbalance + depositAmount
    updatebalance() 
    document.getElementById('deposit-form').reset()
    document.getElementById('deposit-alert').style.display = 'block'
    if(accountbalance >= 0){
    document.getElementById('account-balance').classList.add('text-success')
}
   
    addDepositTohistory(depositType, depositAmount)
}
function transfer () {
    const beneficiaryAccountNumber = document.getElementById('beneficiary-account-number').value
    const beneficiaryName = document.getElementById('beneficiary-name').value
    const transferType = document.getElementById('transfer-type').value
    const transferAmount = Number(document.getElementById('transfer-amount').value)
    const purpose = document.getElementById('purpose').value

    if (transferAmount <= 0) {
        alert("Please enter a valid amount")
        return
    }

    if (transferAmount > accountbalance) {
        alert("Insufficient funds")
        return
    }
    accountbalance = accountbalance - transferAmount
    updatebalance()

    document.getElementById('transfer-form').reset()
    document.getElementById('transfer-alert').style.display = 'block'

    addTransfertohistory(
        transferType,
        beneficiaryName,
        transferAmount,
        beneficiaryAccountNumber,
        purpose
    )
}
    const beneficiaryAccountNumber = document.getElementById('beneficiary-account-number').value
    const beneficiaryName = document.getElementById('beneficiary-name').value
    const transferType = document.getElementById('transfer-type').value
    const transferAmount = Number(document.getElementById('transfer-amount').value)
    const purpose = document.getElementById('purpose').value

    accountbalance = accountbalance - transferAmount
    updatebalance ()

    document.getElementById('transfer-form').reset()
    document.getElementById('transfer-alert').style.display = 'block'

    addTransfertohistory(transferType, beneficiaryName, transferAmount, beneficiaryAccountNumber,purpose)


function updatebalance () {
    document.getElementById('account-balance').innerText =
        `$${accountbalance.toFixed(2)} balance available`
}
function addDepositTohistory(depositType, depositAmount) { 
    const parent = document.getElementById('transaction-history')
    const recordli = document.createElement('li')
    recordli.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
    const leftsectiondiv = document.createElement('div')
    leftsectiondiv.classList.add('ms-2', 'me-auto')
    const div1 = document.createElement('div')
    div1.classList.add('fs-5', 'fw-bold')
    div1.innerText = `${depositType} Deposit`
    const div2 = document.createElement('div')
    div2.classList.add('text-muted')
    div2.innerText = `Method: ${depositType}`

    const div3 = document.createElement('div')
    div3.classList.add('text-muted')
    div3.innerText = `Time: ${new Date().toLocaleString()}`
 
 leftsectiondiv.append(div1, div2, div3)
    
   const rightSectionDiv = document.createElement('div')
    rightSectionDiv.classList.add('text-end')


  const txnAmountDiv = document.createElement('div')
  txnAmountDiv.classList.add('fs-5', 'fw-bold', 'text-danger')
  txnAmountDiv.innerText = `+$${depositAmount.toFixed(2)}`

  const blnAmountDiv = document.createElement('div')
  blnAmountDiv.classList.add('text-muted')
  blnAmountDiv.innerText = `Balance: $${accountbalance.toFixed(2)}`

  rightSectionDiv.append(txnAmountDiv, blnAmountDiv)

  recordli.append(leftsectiondiv, rightSectionDiv)

  const existingHistory = parent.innerHTML
  parent.innerHTML = ''
  parent.append(recordli)
  parent.innerHTML += existingHistory
}
