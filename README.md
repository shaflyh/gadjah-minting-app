# Gadjah Society NFT Minting Website

## Installation 

Step 1: Clone the project

```sh
git clone git@gitlab.com:arnold.pstr/nft-minting-app-main.git
```

Step 2: Install node modules

```sh
npm install
```

## Usage

1) Change the public configurations (on `public` folder)
2) For the smart contract things, find it on `public/config/config.json`. See the file content below.

```json
{
  "CONTRACT_ADDRESS": "0x827acb09a2dc20e39c9aad7f7190d9bc535xxxxx",
  "SCAN_LINK": "https://etherscan.com/address/0x827acb09a2dc20e39c9aad7f7190d9bc535xxxxx",
  "NETWORK": {
    "NAME": "Ethereum Mainnet",
    "SYMBOL": "ETH",
    "ID": 1
  },
  "NFT_NAME": "Gadjah Society",
  "SYMBOL": "GDJH",
  "MAX_SUPPLY": 4828,
  "WEI_COST": 60000000000000000,
  "DISPLAY_COST": 0.06,
  "GAS_LIMIT": 220000,
  "MARKETPLACE": "Opensea",
  "MARKETPLACE_LINK": "https://opensea.io/collection/gadjahsociety",
  "SHOW_BACKGROUND": true
}
```

3) Make sure you copy the contract ABI and paste it in the `public/config/abi.json` file.
4) For changing images or videos (or other assets), go to `public/config/images`.
5) For changing the theme colors, go to `public/config/theme.css` file.

```css
:root {
  --primary: #ebc908;
  --primary-text: #1a1a1a;
  --secondary: #ff1dec;
  --secondary-text: #ffffff;
  --accent: #ffffff;
  --accent-text: #000000;
}
```

6) For changing brand images, change the `public/favicon.ico` and other assets.
7) Update the title and description on `public/index.html` file.

```html
<title>Gadjah Society</title>
<meta name="description" content="My Content" />
```

8) Update the short_name and name fields in the `public/manifest.json` file

```json
{
  "short_name": "GDJH",
  "name": "Gadjah Society NFT"
}
```

9) Run the program.

```sh
npm run start
```

Or create the build if you are ready to deploy.

```sh
npm run build
```

And.. we're done.
