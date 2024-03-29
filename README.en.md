# BaiduFanyi_Crawler

## Table of Contents

* [Intro](#intro)
* [Get Started](#get-started)
  * [1. fork this repo](#1-fork-this-repo)
  * [2. get cookie](#2-get-cookie)
  * [3. set action secrets](#3-set-action-secrets)
* [Run in Local](#run-in-local)

## Intro

Use GitHub Actions to automatically crawl word collections every day.

> The crawled data is stored in the `data` folder in the `json` format.

_**Welcome to submit bugs and improvement suggestions through issues!**_

## Get Started

### 1. fork this repo

### 2. get cookie

- visit [Baidu Fanyi](https://fanyi.baidu.com/)，right click and select `Inspect` to open the devtools console
- select the `Network` column
- select the `Fetch/XHR` filter choice
- enter `transapi` in the filter input box
- enter any content in the web page input box to trigger the translation HTTP request
- click the HTTP request which begins with `v2transapi` in the devtools console
- Then scroll down to find `Request Headers > Cookie` item，right click and select `Copy`

![get_cookie](./assets/gifs/01.get_cookie_cut.gif)

### 3. set action secrets

- enter the **Settings** page
- select `Secrets > Actions` in the sidebar 
- click the "**New repository secret**" button
  - **Name** column: input BAIDU_COOKIE
  - **Secret column**: paste the cookie copied from the devtools console (paste directly without single quotation marks)

![set_secrets](./assets/gifs/03.set_secrets_cut.gif)

## Run in Local

```bash
export BAIDU_COOKIE='your cookie' # notice that there are single quotes
npm install
npm run dev
```

![local_run](./assets/gifs/02.local_run_cut.gif)

