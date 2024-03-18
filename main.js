const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const replace = require("replace-in-file")
const results = replace.sync({
  files: 'www/**/*.html',
  from: /https:\/\/cdn.signalregistry.net/g,
  to: '../cdn',
  countMatches: true,
});


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('www/index.html')
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// =============================================================================
// HTTP Server
// =============================================================================
const http = require('http');
const express = require('express')();

// Http and Websocket Server
const port   = 7339
const server = http.createServer(express)
server.listen(port, () => {
  console.log(`[INFO] HTTP server is listening at port ${port}`)
});
