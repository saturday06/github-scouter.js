github-scouter.js [![Build Status](https://travis-ci.org/saturday06/github-scouter.js.png?branch=master)](https://travis-ci.org/saturday06/github-scouter.js)
=================

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
{ atk: 1130, int: 13, agi: 0 }
```

# Devalopment

```sh
npm install
export PATH="$PWD/node_modules/.bin:$PATH"
tsd reinstall
gulp
```
