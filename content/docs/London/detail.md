---
title: "Theme Detail"
weight: 2
---
### Description

Cards are a very specific visual representation of data.

<div class="alert alert-info">Check the <a href="https://lexicondesign.io">Lexicon</a> <a href="https://lexicondesign.io/docs/patterns/cards.html">Cards Pattern</a> for a more in-depth look at the motivations and proper usage of this component.</div>

### Image card

> Image cards are used in image/document galleries.

#### Default

<div class="row">
	<div class="col-md-4">
		<div class="card-type-asset form-check form-check-card form-check-top-left image-card">
			<div class="card">
				<div class="aspect-ratio card-item-first">
					<div class="custom-control custom-checkbox">
						<label>
							<input class="custom-control-input" type="checkbox"/>
							<span class="custom-control-label"></span>
							<img alt="thumbnail"class="aspect-ratio-item-center-middle aspect-ratio-item-fluid" src="/images/thumbnail_coffee.jpg" />
							<span class="sticker sticker-bottom-left sticker-danger rounded-circle">JPG</span>
						</label>
					</div>
				</div>
				<div class="card-body">
					<div class="card-row">
						<div class="autofit-col autofit-col-expand">
							<div class="card-title text-truncate" title="thumbnail_coffee.jpg">thumbnail_coffee.jpg</div>
							<div class="card-subtitle text-truncate" title="Author Action">Author Action</div>
							<div class="card-detail">
								<span class="label label-success">
									<span class="label-item label-item-expand">Approved</span>
								</span>
							</div>
						</div>
						<div class="autofit-col">
							<div class="dropdown dropdown-action">
								<a aria-expanded="false" aria-haspopup="true" class="component-action dropdown-toggle" data-toggle="dropdown" href="#1" role="button">
									<svg class="lexicon-icon lexicon-icon-ellipsis-v" focusable="false" role="presentation">
										<use href="/images/icons/icons.svg#ellipsis-v" />
									</svg>
								</a>
								<div class="dropdown-menu dropdown-menu-right">
									<a class="dropdown-item" href="#1">Download</a>
									<a class="dropdown-item" href="#1">Edit</a>
									<a class="dropdown-item" href="#1">Move</a>
									<a class="dropdown-item" href="#1">Checkout</a>
									<a class="dropdown-item" href="#1">Permissions</a>
									<a class="dropdown-item" href="#1">Move to Recycle Bin</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

```soy
{call ClayImageCard.render}
	{param actionItems: [
		[
			'href': '#1',
			'label': 'Edit',
			'separator': true
		],
		[
			'href': '#1',
			'label': 'Save'
		]
	] /}
	{param imageAlt: 'thumbnail' /}
	{param imageSrc: '/images/thumbnail_coffee.jpg' /}
	{param labels: [
		[
			'label': 'Approved',
			'style': 'success'
		]
	] /}
	{param selectable: true /}
	{param spritemap: '/images/icons/icons.svg' /}
	{param stickerLabel: 'JPG' /}
	{param stickerShape: 'danger' /}
	{param stickerStyle: 'danger' /}
	{param subtitle: 'Author Action' /}
	{param title: 'thumbnail_coffee.jpg' /}
{/call}
```
```html
<clay-image-card
	actionItems='[{"href": "#1", "label": "Edit", "separator": true}, {"href": "#1", "label": "Save"}]'
	imageAlt="thumbnail"
	imageSrc="/images/thumbnail_coffee.jpg"
	labels='[{"label": "Approved", "style": "success"}]'
	selectable="true"
	spritemap="/images/icons/icons.svg"
	stickerLabel="JPG"
	stickerShape="circle"
	stickerStyle="danger"
	subtitle="Author Action"
	title="thumbnail_coffee.jpg">
</clay-image-card>
```
```html
<div class="card-type-asset form-check form-check-card form-check-top-left image-card">
	<div class="card">
		<div class="aspect-ratio card-item-first">
			<div class="custom-control custom-checkbox">
				<label>
					<input class="custom-control-input" type="checkbox"/>
					<span class="custom-control-label"></span>
					<img alt="thumbnail"class="aspect-ratio-item-center-middle aspect-ratio-item-fluid" src="/images/thumbnail_coffee.jpg" />
					<span class="sticker sticker-bottom-left sticker-danger rounded-circle">JPG</span>
				</label>
			</div>
		</div>
		<div class="card-body">
			<div class="card-row">
				<div class="autofit-col autofit-col-expand">
					<div class="card-title text-truncate" title="thumbnail_coffee.jpg">thumbnail_coffee.jpg</div>
					<div class="card-subtitle text-truncate" title="Author Action">Author Action</div>
					<div class="card-detail">
						<span class="label label-success">
							<span class="label-item label-item-expand">Approved</span>
						</span>
					</div>
				</div>
				<div class="autofit-col">
					<div class="dropdown dropdown-action">
						<a aria-expanded="false" aria-haspopup="true" class="component-action dropdown-toggle" data-toggle="dropdown" href="#1" role="button">
							<svg class="lexicon-icon lexicon-icon-ellipsis-v" focusable="false" role="presentation">
								<use href="/images/icons/icons.svg#ellipsis-v" />
							</svg>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a class="dropdown-item" href="#1">Download</a>
							<a class="dropdown-item" href="#1">Edit</a>
							<a class="dropdown-item" href="#1">Move</a>
							<a class="dropdown-item" href="#1">Checkout</a>
							<a class="dropdown-item" href="#1">Permissions</a>
							<a class="dropdown-item" href="#1">Move to Recycle Bin</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

#### Active

<div class="row">
	<div class="col-md-4">
		<div class="active card-type-asset form-check form-check-card form-check-top-left image-card">
			<div class="card">
				<div class="aspect-ratio card-item-first">
					<div class="custom-control custom-checkbox">
						<label>
							<input class="custom-control-input" type="checkbox" checked="true"/>
							<span class="custom-control-label"></span>
							<img alt="thumbnail"class="aspect-ratio-item-center-middle aspect-ratio-item-fluid" src="/images/thumbnail_coffee.jpg" />
							<span class="sticker sticker-bottom-left sticker-danger">JPG</span>
						</label>
					</div>
				</div>
				<div class="card-body">
					<div class="card-row">
						<div class="autofit-col autofit-col-expand">
							<div class="card-title text-truncate" title="thumbnail_coffee.jpg">thumbnail_coffee.jpg</div>
							<div class="card-subtitle text-truncate" title="Author Action">Author Action</div>
							<div class="card-detail">
								<span class="label label-success">
									<span class="label-item label-item-expand">Approved</span>
								</span>
							</div>
						</div>
						<div class="autofit-col">
							<div class="dropdown dropdown-action">
								<a aria-expanded="false" aria-haspopup="true" class="component-action dropdown-toggle" data-toggle="dropdown" href="#1" role="button">
									<svg class="lexicon-icon lexicon-icon-ellipsis-v" focusable="false" role="presentation">
										<use href="/images/icons/icons.svg#ellipsis-v" />
									</svg>
								</a>
								<div class="dropdown-menu dropdown-menu-right">
									<a class="dropdown-item" href="#1">Download</a>
									<a class="dropdown-item" href="#1">Edit</a>
									<a class="dropdown-item" href="#1">Move</a>
									<a class="dropdown-item" href="#1">Checkout</a>
									<a class="dropdown-item" href="#1">Permissions</a>
									<a class="dropdown-item" href="#1">Move to Recycle Bin</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

```soy
{call ClayImageCard.render}
	{param actionItems: [
		[
			'href': '#1',
			'label': 'Edit',
			'separator': true
		],
		[
			'href': '#1',
			'label': 'Save'
		]
	] /}
	{param imageAlt: 'thumbnail' /}
	{param imageSrc: '/images/thumbnail_coffee.jpg' /}
	{param labels: [
		[
			'label': 'Approved',
			'style': 'success'
		]
	] /}
	{param selectable: true /}
	{param selected: true /}
	{param spritemap: '/images/icons/icons.svg' /}
	{param subtitle: 'Author Action' /}
	{param stickerLabel: 'JPG' /}
	{param stickerStyle: 'danger' /}
	{param title: 'thumbnail_coffee.jpg' /}
{/call}
```
```html
<clay-image-card
	actionItems='[{"href": "#1", "label": "Edit", "separator": true}, {"href": "#1", "label": "Save"}]'
	imageAlt="thumbnail"
	imageSrc="/images/thumbnail_coffee.jpg"
	labels='[{"label": "Approved", "style": "success"}]'
	selectable="true"
	selected="true"
	spritemap="/images/icons/icons.svg"
	stickerLabel="JPG"
	stickerStyle="danger"
	subtitle="Author Action"
	title="thumbnail_coffee.jpg">
</clay-image-card>
```