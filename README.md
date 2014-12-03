github-scouter.js
=================

あなたのGitHub戦闘力を計測します。JSで再実装しました。

本家様はこちら⇒ https://github.com/eiel/github_scouter

# Devalopment

```sh
npm install
patch -p0 < typescript-require.patch
export PATH="$PWD/node_modules/.bin:$PATH"
tsd reinstall
gulp
```
