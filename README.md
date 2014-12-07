github-scouter.js
=================
[![npm version](https://badge.fury.io/js/github-scouter.svg)](http://badge.fury.io/js/github-scouter)
[![Bower version](https://badge.fury.io/bo/github-scouter.svg)](http://badge.fury.io/bo/github-scouter)
[![Build Status](https://travis-ci.org/saturday06/github-scouter.js.png?branch=master)](https://travis-ci.org/saturday06/github-scouter.js)

あなたのGitHub戦闘力を計測します。JSで再実装しました。

本家様はこちら⇒ https://github.com/eiel/github_scouter

# Installation

```sh
$ npm install -g github-scouter
```

# Usage

```sh
$ github-scouter [github ID]
```

# For example

```
$ github-scouter saturday06
戦闘力: 1143
攻撃力: 1130 知力: 13 すばやさ: 0
```

# Development

```sh
npm install
export PATH="$PWD/node_modules/.bin:$PATH"
tsd reinstall
gulp
```
