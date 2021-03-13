const searchButton = document.querySelector('.search-btn')
const moreOptions = document.querySelector('.more-icon')
const searchMore = document.querySelector('.search-container')
const searchBar = document.querySelector('.search-bar')
const sender = document.querySelector('.sender')
const receiver = document.querySelector('.recepient')
const mailSubjet = document.querySelector('.subject')
const keyword = document.querySelector('.keyword')
const minDate = document.querySelector('#from-date')
const maxDate = document.querySelector('#to-date')
const search = document.querySelector('.search-button')
const reset = document.querySelector('.reset-button')
const showMails = document.querySelector('.display-messages')
const emptyMails = document.querySelector('.messages')
const mailCount = document.getElementById('count')


let mails = [
    {
        from: 'aaa@example.com',
        to: 'zzz zzz@example.com',
        subject: '[HR-888] Notice of official announcement',
        date: '0:20',
        fulldate: '2021/03/12-00:20:00'
    },
    {
        from: 'bbb@example.com',
        to: 'yyy@example.com',
        subject: '[web:333] "Web Contact"',
        date: '0:10',
        fulldate: '2021/03/12-00:10:00'
    },
    {
        from: 'ccc@example.com',
        to: 'zxxx@example.com',
        subject: 'Happy New Year! Greetings for the New Year.',
        date: '0:00',
        fulldate: '2021/03/12-00:00:00'
    },
    {
        from: 'ddd@example.com',
        to: 'vvv.vvv@example.com',
        subject: '[HR-887(Revised: Office Expansion Project Team)]Notice of off...',
        date: 'Jan 01',
        fulldate: '2021/01/01'
    },
    {
        from: 'eee@example.com',
        to: 'sss@example.com',
        subject: '[Github]Logout page',
        date: 'Jan 01',
        fulldate: '2021/01/01'
    },
    {
        from: 'fff.fff@example.com',
        to: 'qqq.qqq@example.com',
        subject: '[dev] Postfix 3.1.12/3.2.9/3.3.4/3.4.5',
        date: 'Jan 01',
        fulldate: '2021/01/01'
    },
    {
        from: 'ggg@example.com',
        to: 'ppp@example.com',
        subject: 'Re:[Github]Brush-up on loading animation',
        date: 'Jan 01',
        fulldate: '2021/01/01'
    },
    {
        from: 'hhh.hhh@example.com',
        to: 'ooo.ooo@example.com',
        subject: 'Workplace Summary for sample, Inc: Jun2-Jun9',
        date: 'Jan 01',
        fulldate: '2021/01/01'
    },
    {
        from: 'iii@example.com',
        to: 'nnn@example.com',
        subject: 'I love you',
        date: '2019/12/31',
        fulldate: '2019/12/31'
    },
    {
        from: 'Pablo-Diego-...',
        to: 'Pablo-Diego-Jose-Francisco',
        subject: '[info:888]ABC EQUIPMENT COMPANY',
        date: '2019/12/31',
        fulldate: '2019/12/31'
    },
]

//Display more search options
moreOptions.addEventListener('click', () => {
    searchMore.classList.toggle('show')
})

//Always load all mails on page load
document.addEventListener('DOMContentLoaded', getMails)

//Display results of a search
searchButton.addEventListener('click', filterMail)
search.addEventListener('click', showMail)
reset.addEventListener('click', resetSearch)


function getMails (){
    Object.values(mails).map(item =>
        showMails.innerHTML += `<div class='messages-array'>
        <div class="from">${item.from}</div>
        <div class="to">${item.to}</div>
        <div class="subject">${item.subject}</div>
        <div class="date time">${item.date}</div>
    </div>` 
        )
    //show number of mails
    mailCount.innerText = mails.length
}

function showMail (event){
    event.preventDefault();
    searchBar.value = ''
    if(sender.value != ''){
        searchBar.value += `from:${sender.value} `
    }
    if(receiver.value != ''){
        searchBar.value += `to:${receiver.value} `
    }
    if(mailSubjet.value !=''){
        searchBar.value += `subject:${mailSubjet.value} `
    }
    if(keyword.value !=''){
        searchBar.value += `${keyword.value} `
    }
    if(minDate.value !=''){
        searchBar.value += `after:${minDate.value}`
    }
    if(maxDate.value !=''){
        searchBar.value += `before:${maxDate.value}`
    }
        
    const searchArr = [sender.value, receiver.value, mailSubjet.value, keyword.value, minDate.value, maxDate.value]
    let keyArr = ['from', 'to', 'subject', 'keyword', 'after', 'before']
    let searches = {}
    //Form an object with key value pair of keyArr and searchArr
    keyArr.forEach((key, i) => searches[key] = searchArr[i])
    filterMail(searches)
}

function resetSearch(){
    searchBar.value = sender.value = receiver.value = mailSubjet.value = keyword.value = minDate.value = maxDate.value = ''
    
}

//Filter through the mails depending on the input of the user
function filterMail (item){
    let filteredArr = []
   for (let i=0; i<mails.length; i++){
       if(item.from == mails[i].from){
           filteredArr.push(mails[i])
       } 
       else if (item.to == mails[i].to){
        filteredArr.push(mails[i])
       }
       else if (item.subject == mails[i].subject){
        filteredArr.push(mails[i])
       }
       else if (item.subject !== '' && mails[i].subject.includes(item.subject)){
        filteredArr.push(mails[i])
       }
       else if (item.keyword !== '' && mails[i].subject.includes(item.keyword)){
        filteredArr.push(mails[i])
       }
       else if (searchBar.value !== '' && mails[i].subject.includes(searchBar.value)){
        filteredArr.push(mails[i])
       }
       else if (new Date(`${item.after}`) <=new Date(`${mails[i].fulldate}`) && new Date(`${item.before}`) >=new Date(`${mails[i].fulldate}`)){
        filteredArr.push(mails[i])
       } 
       console.log(searchBar.value)
   }
   displayResult(filteredArr)
}


function displayResult(results) {
    showMails.innerHTML = ''
    if (results.length < 1){
        emptyMails.classList.add('hide')
        showMails.innerHTML += `
        <div class="empty-mail">
            <img src="images/logo.png" alt="logo">
        </div>` 
    }
    else {
        Object.values(results).map(item =>
            showMails.innerHTML += `<div class='messages-array'>
            <div class="from">${item.from}</div>
            <div class="to">${item.to}</div>
            <div class="subject">${item.subject}</div>
            <div class="date">${item.date}</div>
        </div>` 
            )
    }
    //display the number of mails with search result
    mailCount.innerText = results.length
    searchMore.classList.remove('show')
}