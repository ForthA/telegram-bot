const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')
const  TOKEN = '1213875177:AAEv-PkFNALekYkPCbBk6NSEnQcUGLf5vZQ'
//const  TOKEN = '1164509393:AAHp2eflG9qjdDdDH5l1Zvogg1O6VsbxzP8'
const DB_URL = 'mongodb+srv://Forth:cdtnf123@cluster0-kzkic.mongodb.net/test?retryWrites=true&w=majority'
const bot = new TelegramBot(TOKEN, {
    polling: true,
});

var rp = require('request-promise');

var flagprek = false
var allusers = 0
var folusers = 0
var abc = ''
var timerid = new Number()
var flag = false
var username = ''
var actuid = ''
var podpiska = false
var admin = false
var user = false
var url = ''
var random_key = ''
var actcash = 0
var fatherid = ''
var tempStr = ''
var tempStr1 = ''
var qwe = ''
var ewq = ''
var passcheck = false
var mesall = false
var mesallS = ''
var mestime = 0
var zxc = ''
var options = {
reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Перейти', url: 'https://telegra.ph/Polzovatelskoe-Soglashenie-05-28', callback_data: '1' }],
    ]
  })
};
function forwtime(a,b,c) {
    bot.forwardMessage(a,b,c)
}

// Создание прототипа строки с данными в MongoDB
const User = new mongoose.Schema({
    userid: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    follower: {
        type: Boolean,
    },
    fatherid: {
        type: String
    },
    cash: {
        type: Number,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    istypingmestoallP:{
       type: Boolean,
        required: true
    },
    istypingmestoallN:{
        type:Boolean,
        required: true
    },
    startability: {
        type: Boolean,
        required:true
    },
    istypingpost: {
        type: Boolean,
        required : true
    },
    istypingcard: {
        type: Boolean,
        required: true
    },
    cardnumber:{
        type: String,
        required: true
    }

})


// подключение к Монго
var UserMod = mongoose.model('User', User)

var UserFin = new UserMod


UserFin.save().catch()
mongoose.connect(DB_URL, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))
// Этот метод срабатывает, когда бот получает сообщение
 bot.on('message', (msg) => {
    const {successful_payment} = msg
    const {id} = msg.chat
    tempStr = msg.text
       actuid = msg.from.id;
     UserMod.findOne({
         userid: actuid
     }, function (err, users) {
         if (err) throw err;
         if (users !=null) {
             mesall = users.istypingmestoallP
             admin = users.admin
             if (mesall && admin) {
                 mesallS = msg.text
                 UserMod.find({
                     follower: true
                 }, function (err, users) {
                     if (err) throw err;
                     for (let i = 0; i < users.length; i++) {
                         bot.forwardMessage(users[i].userid, actuid, msg.message_id)
                     }
                 })
                 UserMod.findOne({
                     userid: actuid
                 }, function (err, users) {
                     if (err) throw err;
                     users.istypingmestoallP = false
                     users.save()
                 })
             }
         }
     })
     UserMod.findOne({
         userid: actuid
     }, function (err, users) {
         if (err) throw err;
         if (users !=null) {
             mesall = users.istypingmestoallN
             admin = users.admin
             if (mesall && admin) {
                 mesallS = msg.text
                 UserMod.find({
                     follower: false
                 }, function (err, users) {
                     if (err) throw err;
                     for (let i = 0; i < users.length; i++) {
                         bot.forwardMessage(users[i].userid, msg.from.id, msg.message_id)
                     }
                 })
                 UserMod.findOne({
                     userid: actuid
                 }, function (err, users) {
                     if (err) throw err;
                     users.istypingmestoallN = false
                     users.save()
                 })
             }
         }
     })
     UserMod.findOne({
         userid: actuid
     }, function (err, users) {
         if (err) throw err;
         if (users !=null) {
             mesall = users.istypingpost
             admin = users.admin
             if (mesall && admin) {
                 mesallS = msg.text
                 UserMod.find({
                     follower: true
                 }, function (err, users) {
                     if (err) throw err;
                     for (let i = 0; i < users.length; i++) {
                         timerid = setInterval(forwtime,86400000,users[i].userid,actuid,msg.message_id)
                     }
                 })
                 UserMod.findOne({
                     userid: actuid
                 }, function (err, users) {
                     if (err) throw err;
                     users.istyping = false
                     users.save()
                 })
             }
         }
     })
   //Блок проверяет, есть ли сообщение с успешной оплатой подписки
     if (successful_payment != undefined) {
       //  bot.answerPreCheckoutQuery(pre_check.id, true)
         bot.sendMessage(id,'Завершено!')
         actuid = id
         UserMod.findOne({
             userid: actuid
         }, function (err, users) {
             if (err) throw err;
             users.follower = true
             zxc = users.fatherid
             users.save()
         })
         console.log(zxc)
        //Начисление денег
         for (let i = 0; i < 3; i++) {
             if (i === 0) {
                 UserMod.findOne({userid: zxc}, function (err, users) {
                     if (err) throw err;
                     users.cash += 3;
                     users.save()
                     qwe = users.fatherid
                 })
             }
             if (i === 1) {
                 if (qwe === '') break;
                 UserMod.findOne({userid: qwe}, function (err, users) {
                     if (err) throw err;
                     users.cash += 2;
                     users.save()
                     ewq = users.fatherid
                 })
             }
             if (i === 2) {
                 if (ewq === '') break;
                 UserMod.findOne({userid: ewq}, function (err, users) {
                     if (err) throw err;
                     users.cash += 1;
                     users.save()
                 })
             }
         }
         qwe = ''
         ewq = ''
         // Вывод клавиатуры
         bot.sendMessage(id, 'Action', {
             reply_markup: {
                 keyboard: [
                     ['Сгенерировать ссылку'], ['Ваши пользователи'],
                     ['Показать баланс'], ['Вывести деньги'],['Привязать карту'],
                 ]
             }
         })
     }
    // Проверка и получение id человека, который перешёл по ссылке
    for (let i = 0; i < 6; i++) {
        tempStr1 += tempStr[i]
    }
    if (tempStr1 === '/start' && tempStr[6] === ' ') {
        admin = false
        for (let i = 7; i < tempStr.length; i++) {
            fatherid += tempStr[i]
        }
      // Если ссылка админа
        if (fatherid == 'admin') {
            bot.sendMessage(id,'Введите пароль:')
            passcheck = true
        }
      // Если своя ссылка
        else if (fatherid == msg.from.id) {
            bot.sendMessage(id,'Вы не можете перейти по собственной реферальной ссылке. Лучше отправьте её друзьям и знакомым.')
        }
        else {
            zxc = fatherid
            user = true
            podpiska = false;
            UserMod.findOne({userid: msg.from.id}, function (err, users) {
                if (err) throw err;
                if (!(users != null)) {
                   // Блок в котором создаётся строка в Монго, если человек перешёл по ссылке без реферала
                    UserMod.findOne({userid: zxc}, function (err, users) {
                        if (!(users != null)) {
                            fatherid = '136031568'
                            zxc = fatherid
     bot.sendMessage(id, "Привет! Меня зовут Green Code BOT." + "\ud83d\ude42" 
     + "\n" + "\n" + "Я могу стать твоим помощником и советчиком - помогать тебе разрешать все вопросы, которые ты ставишь перед собой. Готов рассказать, как стать эффективнее, результативнее, успешнее в твоих делах - научить достигать поставленные перед собой цели!" + "\ud83d\udc4d" 
     + "\n" + "\n" + "Кстати о целях - можем разобраться, истинные они у тебя или навязанные общественным мнением. Я готов помочь тебе поставить их правильно и обязательно достичь желаемого!" + "\u2728" 
     + "\n" + "\n" + "В общем, если у тебя есть желание стать лучше, осознаннее и гармоничнее - буду рад нашему с тобой общению!" + "\ud83e\udd1d" 
     + "\n" + "\n" + "\u2705" + "КАК ЭТО РАБОТАЕТ?" 
     + "\n" + "\n" + "Я прочитал очень много книг по самопознанию, эффективности, финансовой грамотности и т.д., проанализировал практически всех известных авторов и успешных людей, который делятся информацией о себе. На основании комплексного анализа я смог выделить основные моменты, которые объединяют их всех, и которые позволяют понять, почему все эти люди стали такими успешными и в большинстве своем - счастливыми." + "\u2728"
     + "\n" + "\n" + "Каждый день я буду присылать тебе полезную информацию, делиться основными идеями и методиками, которые ты сможешь использовать в своей повседневной жизни. И уверяю тебя - результат не заставит себя долго ждать!" + "\ud83e\udd73"
     + "\n" + "\n" + "Сотни тысяч людей уже воспользовались данной информацией и благодарны этим знаниям. Присоединяйся к ним! Не откладывай на завтра." + "\ud83d\udc4d"
     + "\n" + "\n" + "\u2705" + "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ"
     + "\n" + "\n" + "Я проделал большую работу, к тому же мне нужно оплачивать свой сервер, поэтому я не могу работать бесплатно. НО! я не удар по твоему карману - подписка стоит всего 650 руб.! Раз и навсегда!" + "\ud83d\udc4d"
     + "\n" + "\n" + "И, кстати, помимо ценной информации, со мной ты можешь заработать! После того, как ты оплатишь подписку, тебе станет доступна персональная реферальная ссылка - ты сможешь отправить ее своим друзьям и знакомым, рассказав обо мне и моих уникальных способностях. За каждого человека, перешедшего по твоей ссылке и оплатившего подписку, ты будешь получать вознаграждение - 200 руб." + "\ud83d\udcb5"
     + "\n" + "\n" + "А если твой реферал пригласит своего друга - он тоже получит 200 руб., а ты - 100 руб. дополнительно! (Для тебя он будет рефералом второго уровня). А за реферала третьего уровня ты получишь еще 50 руб." + "\ud83d\udd25"
     + "\n" + "\n" + "Заработанные деньги ты сможешь моментально вывести на свою банковскую карту. Никаких дополнительных требований для этого не будет!" + "\ud83e\udd1d"
     + "\n" + "\n" + "В общем дружить со мной не только полезно, но и выгодно! Подключайся!" + "\ud83d\udc4d"
     + "\n" + "\n" + "Вместе мы изменим твою жизнь к лучшему - прокачаем твои навыки, поставим правильные цели и обязательно их достигнем!!" + "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83d\ude97\ud83c\udfe0\ud83c\udfd6\u26f5\ufe0f")
     // Здесь должно быть приветствие
bot.sendMessage(id,'Пользовательское соглашение',options)
                            username = "@" + msg.from.username;
                            UserFin = new UserMod({
                                userid: msg.from.id,
                                name: username,
                                follower: podpiska,
                                fatherid: fatherid,
                                cash: 0,
                                admin: admin,
                                startability: false,
                                istypingmestoallP: false,
                                istypingmestoallN: false,
                                istypingpost: false,
                                istypingcard: false,
                                cardnumber: ' '
                            })
                              UserFin.save().catch()
                           // Вывод платежа
                            const boob = {
                                label: 'Оплата подписки Green Code BOT',
                                amount: 65000
                            }
                            const arr = [boob]

                            bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','390540012:LIVE:11199','start','RUB',arr)  
                              //Выше нужно будет ввести ключ платежной системы Tranzzo  
                            bot.on('pre_checkout_query', (pre_check) => {
                                        console.log(pre_check)
                                       bot.answerPreCheckoutQuery(pre_check.id, true)
                                        }
                                )


                        } else {
                        // Блок создания строки, если человек перешёл по чей-то ссылке
                            username = "@" + msg.from.username;
     bot.sendMessage(id,"Привет! Меня зовут Green Code BOT." + "\ud83d\ude42" 
     + "\n" + "\n" + "Я могу стать твоим помощником и советчиком - помогать тебе разрешать все вопросы, которые ты ставишь перед собой. Готов рассказать, как стать эффективнее, результативнее, успешнее в твоих делах - научить достигать поставленные перед собой цели!" + "\ud83d\udc4d" 
     + "\n" + "\n" + "Кстати о целях - можем разобраться, истинные они у тебя или навязанные общественным мнением. Я готов помочь тебе поставить их правильно и обязательно достичь желаемого!" + "\u2728" 
     + "\n" + "\n" + "В общем, если у тебя есть желание стать лучше, осознаннее и гармоничнее - буду рад нашему с тобой общению!" + "\ud83e\udd1d" 
     + "\n" + "\n" + "\u2705" + "КАК ЭТО РАБОТАЕТ?" 
     + "\n" + "\n" + "Я прочитал очень много книг по самопознанию, эффективности, финансовой грамотности и т.д., проанализировал практически всех известных авторов и успешных людей, который делятся информацией о себе. На основании комплексного анализа я смог выделить основные моменты, которые объединяют их всех, и которые позволяют понять, почему все эти люди стали такими успешными и в большинстве своем - счастливыми." + "\u2728"
     + "\n" + "\n" + "Каждый день я буду присылать тебе полезную информацию, делиться основными идеями и методиками, которые ты сможешь использовать в своей повседневной жизни. И уверяю тебя - результат не заставит себя долго ждать!" + "\ud83e\udd73"
     + "\n" + "\n" + "Сотни тысяч людей уже воспользовались данной информацией и благодарны этим знаниям. Присоединяйся к ним! Не откладывай на завтра." + "\ud83d\udc4d"
     + "\n" + "\n" + "\u2705" + "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ"
     + "\n" + "\n" + "Я проделал большую работу, к тому же мне нужно оплачивать свой сервер, поэтому я не могу работать бесплатно. НО! я не удар по твоему карману - подписка стоит всего 650 руб.! Раз и навсегда!" + "\ud83d\udc4d"
     + "\n" + "\n" + "И, кстати, помимо ценной информации, со мной ты можешь заработать! После того, как ты оплатишь подписку, тебе станет доступна персональная реферальная ссылка - ты сможешь отправить ее своим друзьям и знакомым, рассказав обо мне и моих уникальных способностях. За каждого человека, перешедшего по твоей ссылке и оплатившего подписку, ты будешь получать вознаграждение - 200 руб." + "\ud83d\udcb5"
     + "\n" + "\n" + "А если твой реферал пригласит своего друга - он тоже получит 200 руб., а ты - 100 руб. дополнительно! (Для тебя он будет рефералом второго уровня). А за реферала третьего уровня ты получишь еще 50 руб." + "\ud83d\udd25"
     + "\n" + "\n" + "Заработанные деньги ты сможешь моментально вывести на свою банковскую карту. Никаких дополнительных требований для этого не будет!" + "\ud83e\udd1d"
     + "\n" + "\n" + "В общем дружить со мной не только полезно, но и выгодно! Подключайся!" + "\ud83d\udc4d"
     + "\n" + "\n" + "Вместе мы изменим твою жизнь к лучшему - прокачаем твои навыки, поставим правильные цели и обязательно их достигнем!!" + "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83d\ude97\ud83c\udfe0\ud83c\udfd6\u26f5\ufe0f")
     // Здесь должно быть приветствие
bot.sendMessage(id,'Пользовательское соглашение',options)
                            UserFin = new UserMod({
                                userid: msg.from.id,
                                name: username,
                                follower: podpiska,
                                fatherid: zxc,
                                cash: 0,
                                admin: admin,
                                startability: false,
                                istypingmestoallP: false,
                                istypingmestoallN: false,
                                istypingpost: false,
                                istypingcard: false,
                                cardnumber: ' '

                            })
                            UserFin.save().catch()
                       // Оплата подписки
                            const boob = {
                                label: 'Оплата подписки Green Code BOT',
                                amount: 65000
                            }
                            const arr = [boob]

                            bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','390540012:LIVE:11199','start','RUB',arr)
                           //Выше так же надо будет указать ключ Tranzzo
                            bot.on('pre_checkout_query', (pre_check) => {
                                    console.log(pre_check)
                                    bot.answerPreCheckoutQuery(pre_check.id, true)

                                }
                            )


                        }
                    })
                    }
                else {
                    if (users.follower === true){
                        bot.sendMessage(id, 'Action', {
                            reply_markup: {
                                keyboard: [
                                    ['Сгенерировать ссылку'], ['Ваши пользователи'],
                                    ['Показать баланс'], ['Вывести деньги'],['Привязать карту'],
                                ]
                            }
                        })
                    }
                    if (users.follower === false){
                        bot.sendMessage(id, "Привет! Меня зовут Green Code BOT." + "\ud83d\ude42" 
     + "\n" + "\n" + "Я могу стать твоим помощником и советчиком - помогать тебе разрешать все вопросы, которые ты ставишь перед собой. Готов рассказать, как стать эффективнее, результативнее, успешнее в твоих делах - научить достигать поставленные перед собой цели!" + "\ud83d\udc4d" 
     + "\n" + "\n" + "Кстати о целях - можем разобраться, истинные они у тебя или навязанные общественным мнением. Я готов помочь тебе поставить их правильно и обязательно достичь желаемого!" + "\u2728" 
     + "\n" + "\n" + "В общем, если у тебя есть желание стать лучше, осознаннее и гармоничнее - буду рад нашему с тобой общению!" + "\ud83e\udd1d" 
     + "\n" + "\n" + "\u2705" + "КАК ЭТО РАБОТАЕТ?" 
     + "\n" + "\n" + "Я прочитал очень много книг по самопознанию, эффективности, финансовой грамотности и т.д., проанализировал практически всех известных авторов и успешных людей, который делятся информацией о себе. На основании комплексного анализа я смог выделить основные моменты, которые объединяют их всех, и которые позволяют понять, почему все эти люди стали такими успешными и в большинстве своем - счастливыми." + "\u2728"
     + "\n" + "\n" + "Каждый день я буду присылать тебе полезную информацию, делиться основными идеями и методиками, которые ты сможешь использовать в своей повседневной жизни. И уверяю тебя - результат не заставит себя долго ждать!" + "\ud83e\udd73"
     + "\n" + "\n" + "Сотни тысяч людей уже воспользовались данной информацией и благодарны этим знаниям. Присоединяйся к ним! Не откладывай на завтра." + "\ud83d\udc4d"
     + "\n" + "\n" + "\u2705" + "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ"
     + "\n" + "\n" + "Я проделал большую работу, к тому же мне нужно оплачивать свой сервер, поэтому я не могу работать бесплатно. НО! я не удар по твоему карману - подписка стоит всего 650 руб.! Раз и навсегда!" + "\ud83d\udc4d"
     + "\n" + "\n" + "И, кстати, помимо ценной информации, со мной ты можешь заработать! После того, как ты оплатишь подписку, тебе станет доступна персональная реферальная ссылка - ты сможешь отправить ее своим друзьям и знакомым, рассказав обо мне и моих уникальных способностях. За каждого человека, перешедшего по твоей ссылке и оплатившего подписку, ты будешь получать вознаграждение - 200 руб." + "\ud83d\udcb5"
     + "\n" + "\n" + "А если твой реферал пригласит своего друга - он тоже получит 200 руб., а ты - 100 руб. дополнительно! (Для тебя он будет рефералом второго уровня). А за реферала третьего уровня ты получишь еще 50 руб." + "\ud83d\udd25"
     + "\n" + "\n" + "Заработанные деньги ты сможешь моментально вывести на свою банковскую карту. Никаких дополнительных требований для этого не будет!" + "\ud83e\udd1d"
     + "\n" + "\n" + "В общем дружить со мной не только полезно, но и выгодно! Подключайся!" + "\ud83d\udc4d"
     + "\n" + "\n" + "Вместе мы изменим твою жизнь к лучшему - прокачаем твои навыки, поставим правильные цели и обязательно их достигнем!!" + "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83d\ude97\ud83c\udfe0\ud83c\udfd6\u26f5\ufe0f")
     // Здесь должно быть приветствие
                       bot.sendMessage(id,'Пользовательское соглашение',options)
                                              // Оплата подписки
                                              const boob = {
                                                label: 'Оплата подписки Green Code BOT',
                                                amount: 65000
                                            }
                                            const arr = [boob]
                
                                            bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','390540012:LIVE:11199','start','RUB',arr)
                                           //Выше так же надо будет указать ключ Tranzzo
                                            bot.on('pre_checkout_query', (pre_check) => {
                                                    console.log(pre_check)
                                                    bot.answerPreCheckoutQuery(pre_check.id, true)
                
                                                }
                                            )
                    }

                }

                    })

                }
            }

    tempStr = ''
    tempStr1 = ''
    fatherid = ''

    switch (msg.text) {
    //  Создание строки в Монго
        case "/start":
            admin = false
            podpiska = false
            UserMod.findOne({userid: msg.from.id}, function (err, users) {
                if (err) throw err;
                if (!(users != null)) {
                    username = "@" + msg.from.username;
     bot.sendMessage(id, "Привет! Меня зовут Green Code BOT." + "\ud83d\ude42" 
     + "\n" + "\n" + "Я могу стать твоим помощником и советчиком - помогать тебе разрешать все вопросы, которые ты ставишь перед собой. Готов рассказать, как стать эффективнее, результативнее, успешнее в твоих делах - научить достигать поставленные перед собой цели!" + "\ud83d\udc4d" 
     + "\n" + "\n" + "Кстати о целях - можем разобраться, истинные они у тебя или навязанные общественным мнением. Я готов помочь тебе поставить их правильно и обязательно достичь желаемого!" + "\u2728" 
     + "\n" + "\n" + "В общем, если у тебя есть желание стать лучше, осознаннее и гармоничнее - буду рад нашему с тобой общению!" + "\ud83e\udd1d" 
     + "\n" + "\n" + "\u2705" + "КАК ЭТО РАБОТАЕТ?" 
     + "\n" + "\n" + "Я прочитал очень много книг по самопознанию, эффективности, финансовой грамотности и т.д., проанализировал практически всех известных авторов и успешных людей, который делятся информацией о себе. На основании комплексного анализа я смог выделить основные моменты, которые объединяют их всех, и которые позволяют понять, почему все эти люди стали такими успешными и в большинстве своем - счастливыми." + "\u2728"
     + "\n" + "\n" + "Каждый день я буду присылать тебе полезную информацию, делиться основными идеями и методиками, которые ты сможешь использовать в своей повседневной жизни. И уверяю тебя - результат не заставит себя долго ждать!" + "\ud83e\udd73"
     + "\n" + "\n" + "Сотни тысяч людей уже воспользовались данной информацией и благодарны этим знаниям. Присоединяйся к ним! Не откладывай на завтра." + "\ud83d\udc4d"
     + "\n" + "\n" + "\u2705" + "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ"
     + "\n" + "\n" + "Я проделал большую работу, к тому же мне нужно оплачивать свой сервер, поэтому я не могу работать бесплатно. НО! я не удар по твоему карману - подписка стоит всего 650 руб.! Раз и навсегда!" + "\ud83d\udc4d"
     + "\n" + "\n" + "И, кстати, помимо ценной информации, со мной ты можешь заработать! После того, как ты оплатишь подписку, тебе станет доступна персональная реферальная ссылка - ты сможешь отправить ее своим друзьям и знакомым, рассказав обо мне и моих уникальных способностях. За каждого человека, перешедшего по твоей ссылке и оплатившего подписку, ты будешь получать вознаграждение - 200 руб." + "\ud83d\udcb5"
     + "\n" + "\n" + "А если твой реферал пригласит своего друга - он тоже получит 200 руб., а ты - 100 руб. дополнительно! (Для тебя он будет рефералом второго уровня). А за реферала третьего уровня ты получишь еще 50 руб." + "\ud83d\udd25"
     + "\n" + "\n" + "Заработанные деньги ты сможешь моментально вывести на свою банковскую карту. Никаких дополнительных требований для этого не будет!" + "\ud83e\udd1d"
     + "\n" + "\n" + "В общем дружить со мной не только полезно, но и выгодно! Подключайся!" + "\ud83d\udc4d"
     + "\n" + "\n" + "Вместе мы изменим твою жизнь к лучшему - прокачаем твои навыки, поставим правильные цели и обязательно их достигнем!!" + "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83d\ude97\ud83c\udfe0\ud83c\udfd6\u26f5\ufe0f")
     // Здесь должно быть приветствие
bot.sendMessage(id,'Пользовательское соглашение',options)
                    UserFin = new UserMod({
                        userid: msg.from.id,
                        name: username,
                        follower: podpiska,
                        fatherid: '136031568',
                        cash: 0,
                        admin: admin,
                        startability: false,
                        istypingmestoall: false,
                        istypingpost: false,
                        istypingcard: false,
                        cardnumber: ' '
                    })
                    UserFin.save().catch()


                    const boob = {
                        label: 'Оплата подписки Green Code BOT',
                        amount: 65000
                    }
                    const arr = [boob]

                    bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','390540012:LIVE:11199','start','RUB',arr)
                   //Ключ Tranzzo
                    bot.on('pre_checkout_query', (pre_check) => {
                            console.log(pre_check)
                            bot.answerPreCheckoutQuery(pre_check.id, true)

                        }
                    )
                }
                else {
                    if (users.follower === true){
                        bot.sendMessage(id, 'Action', {
                            reply_markup: {
                                keyboard: [
                                    ['Сгенерировать ссылку'], ['Ваши пользователи'],
                                    ['Показать баланс'], ['Вывести деньги'],['Привязать карту'],
                                ]
                            }
                        })
                    }
                }
            })

                    break;
        case 'Сгенерировать ссылку':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                user = users.follower
            })
            if (user) {
                actuid = msg.from.id;
                UserMod.findOne({
                    userid: actuid
                }, function (err, users) {
                    if (err) throw err;
                    url = users.userid
                    random_key = 't.me/GreenCodeBot?start=' + url;
                    bot.sendMessage(id, random_key)
                })
            }
            break;
        case 'Сгенерировать ссылку (адм.)':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                admin = users.admin
            })
            if (admin) {
                actuid = msg.from.id;
                UserMod.findOne({
                    userid: actuid
                }, function (err, users) {
                    if (err) throw err;
                    url = users.userid
                    random_key = 't.me/GreenCodeBot?start=' + url;
                    bot.sendMessage(id, random_key)
                })
            }

            break;
        case 'Ваши пользователи':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                user = users.follower
                admin = users.admin
            })
            if (user || admin){
            UserMod.find({
                fatherid: msg.from.id,
                follower: true
            }, function (err, users) {
                if (err) throw err;
                bot.sendMessage(id, 'Оплатили подписку: ' + users.length)
                for (let i = 0; i < users.length; i++) {
                    bot.sendMessage(id, users[i].name)
                }
            })
                UserMod.find({
                    fatherid: msg.from.id,
                    follower: false
                }, function (err, users) {
                    if (err) throw err;
                    bot.sendMessage(id,'Не оплатили подписку: ' + users.length)
                    for (let i = 0; i < users.length ; i++) {
                        bot.sendMessage(id,users[i].name)
                    }
            })
           }

            break;
        case 'Показать баланс':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                user = users.follower
            })
           if (user) {
                actuid = msg.from.id;
                UserMod.findOne({
                    userid: actuid
                }, function (err, users) {
                    if (err) throw err;
                    actcash = users.cash
                    bot.sendMessage(id, 'Your balance: ' + actcash + "$")
                })
            }
            break;
        case 'Показать баланс (адм.)':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
               admin = users.admin
            })
            if (admin) {
                UserMod.findOne({
                    userid: actuid
                }, function (err, users) {
                    if (err) throw err;
                    actcash = users.cash
                    bot.sendMessage(id, 'Your balance: ' + actcash + "$")
                })
            }
            break;
        case 'Отправить сообщение НЕ оплатившим':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                admin = users.admin
            if (admin){
                UserMod.findOne({
                    userid: actuid
                }, function (err, users) {
                    if (err) throw err;
                    users.istypingmestoallN = true
                    users.save()
                })
                 mesall = true
                 bot.sendMessage(id,'Введите сообщение')
            }
            })
            break;
        case 'Отправить сообщение подписчикам':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                admin = users.admin
                if (admin){
                    UserMod.findOne({
                        userid: actuid
                    }, function (err, users) {
                        if (err) throw err;
                        users.istypingmestoallP = true
                        users.save()
                    })
                    mesall = true
                    bot.sendMessage(id,'Введите сообщение')
                }
            })
            break
        case 'Пост по времени':
            actuid = msg.from.id;
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                admin = users.admin
                if (admin){
                    UserMod.findOne({
                        userid: actuid
                    }, function (err, users) {
                        if (err) throw err;
                        users.istypingpost = true
                        users.save()
                    })
                    mesall = true
                    bot.sendMessage(id,'Введите сообщение')
                }
            })
            break;
      // Ниже надо будет указать пароль для админ панели
        case 'HESOYAM':
            if (passcheck) {
                admin = true;
                UserMod.findOne({userid: msg.from.id}, function (err, users) {
                    if (err) throw err;
                    if (!(users != null)){
                        username = "@" + msg.from.username;
                        UserFin = new UserMod({
                            userid: msg.from.id,
                            name: username,
                            follower: podpiska,
                            fatherid: '',
                            cash: 0,
                            admin: true,
                            istypingmestoallP: false,
                            istypingmestoallN: false,
                            startability: false,
                            istypingpost: false,
                            istypingcard: false,
                            cardnumber: ' '
                        })
                        UserFin.save().catch()
                    }
                })
                bot.sendMessage(id, 'Вы вошли как админ.', {
                    reply_markup: {
                        keyboard: [
                            ['Отправить сообщение НЕ оплатившим'],['Отправить сообщение подписчикам'],
                            ['Пост по времени'],
                            ['Сгенерировать ссылку (адм.)'], ['Показать баланс (адм.)'],
                            ['Ваши пользователи']
                        ]
                    }
                })
            }
          passcheck = false
        break;
        case 'Привязать карту':
            actuid = msg.from.id
            UserMod.findOne({
                userid: actuid
            }, function (err,users) {
                if (users !=null) {
                    users.istypingcard = true
                    users.save()
                }
            })
            bot.sendMessage(id,'Введите номер вашей карты:')
            break
        case 'Вывести деньги':
            actuid = msg.from.id
            UserMod.findOne({
                userid: actuid
            }, function (err,users) {
                if (users.cardnumber !== ' ') {
                    const options = {
                       // Ниже нужно указать все ключи, которые получите после регистрации на Tranzzo
                        method: 'POST',
                        uri: "https://cpay.tranzzo.com/api/v1/payment",
                        headers: {
                            "Content-Type": "application/json",
                            "X-API-AUTH": "CPAY 560429f2-e967-4215-b888-16ad7d2e3302:SkNBOE5WSVpUT2cyU1paYVNaNGlBck10",
                            "X-API-KEY": "AIzaSyCH4mpFmGXPElJmYG_KIlU0ZvEnuTLyFnc"
                        },
                        body: {
                            pos_id: "af4ab442-f63a-4f6c-a9c5-6e10d69879d7",
                            mode: "direct",
                            method: "p2p",
                            amount: users.cash,
                            currency: "USD",
                            description: "123",
                            order_id: "123",
                            cc_token: "af4ab442-f63a-4f6c-a9c5-6e10d69879d7",
                            recipient_cc_number: users.cardnumber,
                            order_3ds_bypass: "always"
                        },
                        json: true
                    }
                    rp(options)
                        .then(function (parsedBody) {
                            console.log('Complete')
                            users.cash = 0
                            users.save()
                        })
                        .catch(function (err) {
                            console.log('error')
                            console.log(err.error)
                            bot.sendMessage(id,'Ошибка платежа')
                        });
                }
                else {
                    bot.sendMessage(id,'Сначала привяжите карту')
                }
            })
        default:
       // Блок ввода номера карты и т.д 
       //     actuid = msg.from.id;
         //   UserMod.findOne({
           //     userid: actuid
 //           }, function (err, users) {
 //               if (err) throw err;
 //               if (users !=null) {
 //                   mesall = users.istypingmestoallP
 //                   admin = users.admin
 //                   if (mesall && admin) {
 //                       mesallS = msg.text
 //                       UserMod.find({
 //                           follower: true
 //                       }, function (err, users) {
 //                           if (err) throw err;
 //                           for (let i = 0; i < users.length; i++) {
 //                               bot.forwardMessage(users[i].userid, actuid, msg.message_id)
 //                           }
 //                       })
 //                       UserMod.findOne({
 //                           userid: actuid
 //                       }, function (err, users) {
 //                           if (err) throw err;
 //                           users.istypingmestoallP = false
 //                           users.save()
 //                       })
 //                   }
 //               }
 //           })
 //           UserMod.findOne({
 //              userid: actuid
 //           }, function (err, users) {
 //               if (err) throw err;
 //               if (users !=null) {
 //                   mesall = users.istypingmestoallN
 //                   admin = users.admin
 //                   if (mesall && admin) {
 //                       mesallS = msg.text
 //                       UserMod.find({
 //                           follower: false
 //                       }, function (err, users) {
 //                           if (err) throw err;
 //                           for (let i = 0; i < users.length; i++) {
 //                               bot.forwardMessage(users[i].userid, actuid, msg.message_id)
 //                           }
 //                       })
  //                      UserMod.findOne({
 //                           userid: actuid
 //                       }, function (err, users) {
 //                           if (err) throw err;
 //                           users.istypingmestoallN = false
 //                           users.save()
 //                       })
 //                   }
 //               }
 //           })
 //           UserMod.findOne({
 //               userid: actuid
 //           }, function (err, users) {
 //               if (err) throw err;
 //               if (users !=null) {
 //                   mesall = users.istypingpost
 //                   admin = users.admin
 //                   if (mesall && admin) {
 //                       mesallS = msg.text
 //                       UserMod.find({
 //                           follower: true
 //                       }, function (err, users) {
  //                          if (err) throw err;
   //                         for (let i = 0; i < users.length; i++) {
//                               timerid = setInterval(forwtime,86400000,users[i].userid,actuid,msg.message_id)
                      //      }
                       // })
 //                       UserMod.findOne({
 //                           userid: actuid
 //                       }, function (err, users) {
 //                           if (err) throw err;
  //                          users.istyping = false
   //                         users.save()
   //                     })
    //                }
     //           }
      //      })
            UserMod.findOne({
                userid: actuid
            }, function (err, users) {
                if (err) throw err;
                if (users !=null) {
                    if (users.istypingcard && users.follower) {
                        var mes = msg.text
                        users.cardnumber = mes
                        bot.sendMessage(id,'Номер вашей карты привязан')
                        UserMod.findOne({
                            userid: actuid
                        }, function (err, users) {
                            if (err) throw err;
                            users.istypingcard = false
                            users.save()
                        })
                    }
                }
            })
            break;
    }
});
