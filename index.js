const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')
const  TOKEN = '1164509393:AAHp2eflG9qjdDdDH5l1Zvogg1O6VsbxzP8'
const DB_URL = 'mongodb://localhost/DatabaseX'
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
function forwtime(a,b,c) {
    bot.forwardMessage(a,b,c)
}


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



var UserMod = mongoose.model('User',User)

var UserFin = new UserMod


UserFin.save().catch()
mongoose.connect(DB_URL, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

 bot.on('message', (msg) => {
     const {successful_payment} = msg
    const {id} = msg.chat
    tempStr = msg.text
     if (successful_payment != undefined) {
         bot.answerPreCheckoutQuery(pre_check.id, true)
         bot.sendMessage(id,'Завершено!')
         actuid = id
         UserMod.findOne({
             userid: actuid
         }, function (err, users) {
             if (err) throw err;
             users.follower = true
             users.save()
         })
         console.log(zxc)
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
         bot.sendMessage(id, 'Action', {
             reply_markup: {
                 keyboard: [
                     ['Сгенерировать ссылку'], ['Ваши пользователи'],
                     ['Показать баланс'], ['Вывести деньги'],['Привязать карту'],
                 ]
             }
         })
     }

    for (let i = 0; i < 6; i++) {
        tempStr1 += tempStr[i]
    }
    if (tempStr1 === '/start' && tempStr[6] === ' ') {
        admin = false
        for (let i = 7; i < tempStr.length; i++) {
            fatherid += tempStr[i]
        }
        if (fatherid == 'admin') {
            bot.sendMessage(id,'Введите пароль:')
            passcheck = true
        }
        else if (fatherid == msg.from.id) {
            bot.sendMessage(id,'Вы не можете перейти по собственной реферальной ссылке - отправьте её друзьям и знакомым')
        }
        else {
            zxc = fatherid
            user = true
            podpiska = false;
            UserMod.findOne({userid: msg.from.id}, function (err, users) {
                if (err) throw err;
                if (!(users != null)) {
                    UserMod.findOne({userid: zxc}, function (err, users) {
                        if (!(users != null)) {
                            fatherid = '136031568'
                            zxc = fatherid
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

                            const boob = {
                                label: '123',
                                amount: 1000
                            }
                            const arr = [boob]

                            bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','410694247:TEST:c7f7ebfc-be59-48d0-a9c1-fb9b89b96696','start','USD',arr)
                                bot.on('pre_checkout_query', (pre_check) => {
                                        console.log(pre_check)

                                        }
                                )


                        } else {
                            username = "@" + msg.from.username;
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
                            const boob = {
                                label: '123',
                                amount: 1000
                            }
                            const arr = [boob]

                            bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','410694247:TEST:c7f7ebfc-be59-48d0-a9c1-fb9b89b96696','start','USD',arr)
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
                }

                    })

                }
            }

    tempStr = ''
    tempStr1 = ''
    fatherid = ''

    switch (msg.text) {
        case "/start":
            admin = false
            podpiska = false
            UserMod.findOne({userid: msg.from.id}, function (err, users) {
                if (err) throw err;
                if (!(users != null)) {
                    username = "@" + msg.from.username;
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
                        label: '123',
                        amount: 1000
                    }
                    const arr = [boob]

                    bot.sendInvoice(id,'Оплата','Оплата подписки','ZADA','410694247:TEST:c7f7ebfc-be59-48d0-a9c1-fb9b89b96696','start','USD',arr)
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
                    random_key = 't.me/SmthNODEBot?start=' + url;
                    bot.sendMessage(id, random_key)
                })
            }
            break;
        case 'Сгенерировать ссылку(адм)':
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
                    random_key = 't.me/SmthNODEBot?start=' + url;
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
        case 'Показать баланс(адм)':
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
        case 'Отправить всем сообщение(неподписанные)':
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
        case 'Отправить всем сообщение(подписанные)':
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
                bot.sendMessage(id, 'Вы вошли как админ', {
                    reply_markup: {
                        keyboard: [
                            ['Отправить всем сообщение(неподписанные)'],['Отправить всем сообщение(подписанные)'],
                            ['Пост по времени'],
                            ['Сгенерировать ссылку(адм)'], ['Показать баланс(адм)'],
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
                            recipient_cc_number:"5469720013219106",
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
                                bot.forwardMessage(users[i].userid, actuid, msg.message_id)
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


