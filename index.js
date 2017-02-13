const fetch    = require("isomorphic-fetch")
const notifier = require('node-notifier')
const path     = require('path')
const Task     = require('data.task')

const args                = process.argv.slice(2)
const transactionHash     = args[0]
const targetConfirmations = args[1] || 3
const timeout             = args[2] || 60

const errorContact = 'Error making contact. Did you paste the correct hash?'
const showError    = e => console.error('\n', e.message, '\n')

//    fetchJSON :: url -> Task Error JSON
const fetchJSON = url =>
    new Task((reject, resolve) => {
        fetch(url)
            .then(result => result.json())
            .then(result => {
                if (result.status === 'fail') return reject(Error(errorContact))
                resolve(result)
            })
            .catch(e => reject(Error(e)))
    })

//    buildNotification :: a -> {}
const buildNotification = confirmations => ({
    title: 'Bitcoin',
    message: `Your transaction now has ${confirmations} confirmations!`,
    icon: path.join(__dirname, 'images/bitcoin.png'),
    wait: true,
    sound: true,
    confirmations
})

const checkTransactionConfirmations = (timeout, targetConfirmations, transactionHash) =>
    fetchJSON(`https://blockr.io/api/v1/tx/info/${transactionHash}`)
        .map(d => d.data.confirmations)
        .map(buildNotification)
        .fork(showError, d => {
            if (d.confirmations >= targetConfirmations) {
                return notifier.notify(d)
            }
            console.log('Confirmations so far:', d.confirmations)
            setTimeout(() => checkTransactionConfirmations(timeout, targetConfirmations, transactionHash), timeout * 1000)
        })

checkTransactionConfirmations(timeout, targetConfirmations, transactionHash)
