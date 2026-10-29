# Equi Balance Shopify theme

A native Shopify Online Store 2.0 theme for Equi Balance. Built with Liquid, JSON templates, CSS and vanilla JavaScript. No build step or external dependencies are required.

## Preview and deploy

1. Install the current [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) and authenticate with `shopify auth login`.
2. From this directory run `shopify theme dev --store your-store.myshopify.com` to preview against a development store.
3. Run `shopify theme check` to check Liquid, schemas and theme conventions.
4. Push a development theme with `shopify theme push --unpublished --store your-store.myshopify.com`; publish it from Shopify Admin after review.
5. For GitHub integration, connect the repository in Shopify Admin → Online Store → Themes → Add theme → Connect from GitHub. Keep secrets out of the repository.

## Theme editor

Upload/replace the logo in Theme settings. Add licensed horse photography to the image settings in the hero, story, development, and editorial sections. Configure the header and footer menus in Navigation and select them in the corresponding sections. Add products and collections in Shopify Admin; collection and product templates use live Shopify data. Create a blog and articles for the Knowledge Hub. Add the balance pad product only once its prototype, approved product details, and launch timing are ready.

Homepage sections can be edited, removed, and reordered in the theme editor. The supplied default homepage has a clear visual direction and section copy; key photography is deliberately left as editor-selectable content.

## Store setup checklist

- Set store currency to ZAR and configure South African markets, tax, shipping, and a compatible payment provider in Shopify Admin.
- Select the eventual domain in Shopify Admin; no domain is hardcoded here.
- Add store contact details and configure the contact recipient.
- Review policies, navigation, social links, and SEO page titles/descriptions.
- Upload licensed photography and provide meaningful alt text in the editor.
- Add and verify products before publishing them; balance pads remain in development until approved.
- Test the theme on a development store, including product options, cart, forms, search, and checkout handoff.

## Structure

`layout/` global shell · `sections/` editor-configurable components · `snippets/` shared UI · `templates/` Shopify routes · `assets/` styles, scripts, and supplied logo.
