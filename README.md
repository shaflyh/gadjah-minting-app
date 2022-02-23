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
  "SCAN_LINK": "https://polygonscan.com/token/0x827acb09a2dc20e39c9aad7f7190d9bc535xxxxx",
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
  "MARKETPLACE": "Opeansea",
  "MARKETPLACE_LINK": "https://opensea.io/collection/the-stripes-nft",
  "SHOW_BACKGROUND": true
}
```

Make sure you copy the contract ABI from remix and paste it in the `public/config/abi.json` file.
(follow the youtube video if you struggle with this part).

Now you will need to create and change 2 images and a gif in the `public/config/images` folder, `bg.png`, `example.gif` and `logo.png`.

Next change the theme colors to your liking in the `public/config/theme.css` file.

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

Now you will need to create and change the `public/favicon.ico`, `public/logo192.png`, and
`public/logo512.png` to your brand images.

Remember to update the title and description the `public/index.html` file

```html
<title>The Stripes NFT</title>
<meta name="description" content="Mint your Stripes NFT" />
```

Also remember to update the short_name and name fields in the `public/manifest.json` file

```json
{
  "short_name": "TSNFT",
  "name": "The Stripes NFT"
}
```

After all the changes you can run.

```sh
npm run start
```

Or create the build if you are ready to deploy.

```sh
npm run build
```

Now you can host the contents of the build folder on a server.

That's it! you're done.
