process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
require('./config')
const { default: hisokaConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const {useSingleFileAuthState,
  DisconnectReason
const { state, saveState } = useSingleFileAuthState(`./session.millie.json`)
} = require('@adiwajshing/baileys')
const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const pino = require('pino')
const os = require('os')
let simple = require('./lib/simple')
const {MakeSession} =require ('./lib/session')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
global.authFile ='./session.millie.json' 

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

if(!fs.existsSync('./session.millie.json')){
MakeSession(global.session,authFile)
}





global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}


global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
// console.log({ opts })
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// if (opts['cluster']) {
//   require('./lib/cluster').Cluster()
// }
setTimeout(() => {
global.isInit = !fs.existsSync(authFile)
const { state, saveState } = useSingleFileAuthState(global.authFile)

const connectionOptions = {
  version: [2, 2204, 13],
  logger: pino({ level: 'silent' }),
  printQRInTerminal: false,
  auth: state,
  getMessage: async key => {
    return {
      conversation: 'ʀᴇᴄᴏɴɴᴇᴄᴛᴇᴅ 🎈'
    }
  }
}

global.conn = simple.makeWASocket(connectionOptions)

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}

async function connectionUpdate(update) {
  //console.log(require('chalk').green('Activating the Bot, Please wait a moment......'))
  
  const { lastDisconnect } = update
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && hisoka.ws.readyState !== WebSocket.CONNECTING) {
    //console.log(global.reloadHandler(true))
    //console.log("Establishing Secure connection")
  }
  if (global.db.data == null) await loadDatabase()
  //console.log("Connected and ready to go...✔")
  //console.log(JSON.stringify(update, null, 4))
  

}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/


const imports = (path) => {
  path = require.resolve(path)
  let modules, retry = 0
  do {
    if (path in require.cache) delete require.cache[path]
    modules = require(path)
    retry++
  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)
  return modules
}
let isInit = true
global.reloadHandler = function (restatConn) {
  let handler = imports('./handler')
  if (restatConn) {
    try { global.hisoka.ws.close() } catch { }
    global.conn = {
      ...global.conn, ...simple.makeWASocket(connectionOptions)
    }
  }
  if (!isInit) {
    hisoka.ev.off('messages.upsert', hisoka.handler)
    hisoka.ev.off('group-participants.update', hisoka.participantsUpdate)
    hisoka.ev.off('message.delete', hisoka.onDelete)
    hisoka.ev.off('connection.update', hisoka.connectionUpdate)
    hisoka.ev.off('creds.update', hisoka.credsUpdate)
  }

  hisoka.welcome = 'Hi @user!\nWelcome to  @subject\n\n@desc'
  hisoka.bye = 'Goodbye @user!\nIf you come back, take a look!'
  hisoka.spromote = '*───「 PROMOTE DETECTED 」───*\n\n@user now admin!\n'
  hisoka.sdemote = '*───「 DEMOTE DETECTED 」───*\n\n@user now not admin !\n'
  hisoka.handler = handler.handler.bind(conn)
  hisoka.participantsUpdate = handler.participantsUpdate.bind(conn)
  hisoka.onDelete = handler.delete.bind(conn)
  hisoka.connectionUpdate = connectionUpdate.bind(conn)
  hisoka.credsUpdate = saveState.bind(conn)

  hisoka.ev.on('messages.upsert', hisoka.handler)
  hisoka.ev.on('group-participants.update', hisoka.participantsUpdate)
  hisoka.ev.on('message.delete', hisoka.onDelete)
  hisoka.ev.on('connection.update', hisoka.connectionUpdate)
  hisoka.ev.on('creds.update', hisoka.credsUpdate)
  isInit = false
  
  return true
   
}



// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
    cp.spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  //console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) hisoka.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) hisoka.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) hisoka.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  
}, 3000);

console.log('Connected')
