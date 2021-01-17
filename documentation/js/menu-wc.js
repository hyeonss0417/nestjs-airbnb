'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-airbnb documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' : 'data-target="#xs-controllers-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' :
                                            'id="xs-controllers-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' : 'data-target="#xs-injectables-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' :
                                        'id="xs-injectables-links-module-AppModule-8f79fd907431811f36fdf59cbd08db99"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-c340e28363906641a6f31076e4374cd9"' : 'data-target="#xs-injectables-links-module-AuthModule-c340e28363906641a6f31076e4374cd9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c340e28363906641a6f31076e4374cd9"' :
                                        'id="xs-injectables-links-module-AuthModule-c340e28363906641a6f31076e4374cd9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConversationsModule.html" data-type="entity-link">ConversationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' : 'data-target="#xs-controllers-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' :
                                            'id="xs-controllers-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' }>
                                            <li class="link">
                                                <a href="controllers/ConversationsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConversationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' : 'data-target="#xs-injectables-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' :
                                        'id="xs-injectables-links-module-ConversationsModule-6dc6d2248712036ead57a600f142a694"' }>
                                        <li class="link">
                                            <a href="injectables/ConversationsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ConversationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CountriesModule.html" data-type="entity-link">CountriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' : 'data-target="#xs-controllers-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' :
                                            'id="xs-controllers-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' }>
                                            <li class="link">
                                                <a href="controllers/CountriesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CountriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' : 'data-target="#xs-injectables-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' :
                                        'id="xs-injectables-links-module-CountriesModule-fa9132e732bc4225191a57b41a976632"' }>
                                        <li class="link">
                                            <a href="injectables/CountriesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CountriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiscountsModule.html" data-type="entity-link">DiscountsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' : 'data-target="#xs-controllers-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' :
                                            'id="xs-controllers-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' }>
                                            <li class="link">
                                                <a href="controllers/DiscountsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiscountsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' : 'data-target="#xs-injectables-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' :
                                        'id="xs-injectables-links-module-DiscountsModule-b7a92bd2375b0fa9fbba64438eb99a29"' }>
                                        <li class="link">
                                            <a href="injectables/DiscountsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DiscountsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListsModule.html" data-type="entity-link">ListsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' : 'data-target="#xs-controllers-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' :
                                            'id="xs-controllers-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' }>
                                            <li class="link">
                                                <a href="controllers/ListsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' : 'data-target="#xs-injectables-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' :
                                        'id="xs-injectables-links-module-ListsModule-0b696f1e2b3829bef17f287fa327c000"' }>
                                        <li class="link">
                                            <a href="injectables/ListsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ListsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentsModule.html" data-type="entity-link">PaymentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' : 'data-target="#xs-controllers-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' :
                                            'id="xs-controllers-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' : 'data-target="#xs-injectables-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' :
                                        'id="xs-injectables-links-module-PaymentsModule-ed8056f37952731053a6ac9cfd4fba9a"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PaymentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PhotosModule.html" data-type="entity-link">PhotosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' : 'data-target="#xs-controllers-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' :
                                            'id="xs-controllers-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' }>
                                            <li class="link">
                                                <a href="controllers/PhotosController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhotosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' : 'data-target="#xs-injectables-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' :
                                        'id="xs-injectables-links-module-PhotosModule-36b056a5fad0e553182a1ae73aac9e61"' }>
                                        <li class="link">
                                            <a href="injectables/PhotosService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PhotosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationsModule.html" data-type="entity-link">ReservationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' : 'data-target="#xs-controllers-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' :
                                            'id="xs-controllers-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReservationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' : 'data-target="#xs-injectables-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' :
                                        'id="xs-injectables-links-module-ReservationsModule-0fec07b6fad263d76224d414256a9284"' }>
                                        <li class="link">
                                            <a href="injectables/ReservationsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ReservationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link">ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' : 'data-target="#xs-controllers-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' :
                                            'id="xs-controllers-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' : 'data-target="#xs-injectables-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' :
                                        'id="xs-injectables-links-module-ReviewsModule-4ab3ea9715db607e77cc195827274c74"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomsModule.html" data-type="entity-link">RoomsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' : 'data-target="#xs-controllers-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' :
                                            'id="xs-controllers-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' }>
                                            <li class="link">
                                                <a href="controllers/RoomsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoomsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' : 'data-target="#xs-injectables-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' :
                                        'id="xs-injectables-links-module-RoomsModule-19c6265b9e06953c940c436e2a690601"' }>
                                        <li class="link">
                                            <a href="injectables/RoomsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RoomsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TodoModule.html" data-type="entity-link">TodoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TodoModule-17e968b12598be636000102106d54ae8"' : 'data-target="#xs-controllers-links-module-TodoModule-17e968b12598be636000102106d54ae8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TodoModule-17e968b12598be636000102106d54ae8"' :
                                            'id="xs-controllers-links-module-TodoModule-17e968b12598be636000102106d54ae8"' }>
                                            <li class="link">
                                                <a href="controllers/TodoController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TodoModule-17e968b12598be636000102106d54ae8"' : 'data-target="#xs-injectables-links-module-TodoModule-17e968b12598be636000102106d54ae8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TodoModule-17e968b12598be636000102106d54ae8"' :
                                        'id="xs-injectables-links-module-TodoModule-17e968b12598be636000102106d54ae8"' }>
                                        <li class="link">
                                            <a href="injectables/TodoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TodoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-c8281694068d391084467795da54ab05"' : 'data-target="#xs-controllers-links-module-UsersModule-c8281694068d391084467795da54ab05"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c8281694068d391084467795da54ab05"' :
                                            'id="xs-controllers-links-module-UsersModule-c8281694068d391084467795da54ab05"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-c8281694068d391084467795da54ab05"' : 'data-target="#xs-injectables-links-module-UsersModule-c8281694068d391084467795da54ab05"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c8281694068d391084467795da54ab05"' :
                                        'id="xs-injectables-links-module-UsersModule-c8281694068d391084467795da54ab05"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Amenity.html" data-type="entity-link">Amenity</a>
                            </li>
                            <li class="link">
                                <a href="classes/Conversation.html" data-type="entity-link">Conversation</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoreEntity.html" data-type="entity-link">CoreEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/Country.html" data-type="entity-link">Country</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateConversationDto.html" data-type="entity-link">CreateConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCountryDto.html" data-type="entity-link">CreateCountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDiscountDto.html" data-type="entity-link">CreateDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateListDto.html" data-type="entity-link">CreateListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link">CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePhotoDto.html" data-type="entity-link">CreatePhotoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link">CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link">CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoomDto.html" data-type="entity-link">CreateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTodoDTO.html" data-type="entity-link">CreateTodoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateRange.html" data-type="entity-link">DateRange</a>
                            </li>
                            <li class="link">
                                <a href="classes/Discount.html" data-type="entity-link">Discount</a>
                            </li>
                            <li class="link">
                                <a href="classes/Facility.html" data-type="entity-link">Facility</a>
                            </li>
                            <li class="link">
                                <a href="classes/List.html" data-type="entity-link">List</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link">Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Photo.html" data-type="entity-link">Photo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rating.html" data-type="entity-link">Rating</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reservation.html" data-type="entity-link">Reservation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReserveRoomDTO.html" data-type="entity-link">ReserveRoomDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Review.html" data-type="entity-link">Review</a>
                            </li>
                            <li class="link">
                                <a href="classes/Room.html" data-type="entity-link">Room</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rule.html" data-type="entity-link">Rule</a>
                            </li>
                            <li class="link">
                                <a href="classes/Todo.html" data-type="entity-link">Todo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateConversationDto.html" data-type="entity-link">UpdateConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDiscountDto.html" data-type="entity-link">UpdateDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateListDto.html" data-type="entity-link">UpdateListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentDto.html" data-type="entity-link">UpdatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePhotoDto.html" data-type="entity-link">UpdatePhotoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReservationDto.html" data-type="entity-link">UpdateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDto.html" data-type="entity-link">UpdateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoomDto.html" data-type="entity-link">UpdateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTodoDTO.html" data-type="entity-link">UpdateTodoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Verification.html" data-type="entity-link">Verification</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DiscountStrategy.html" data-type="entity-link">DiscountStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPriceDetail.html" data-type="entity-link">IPriceDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IReservationConstructor.html" data-type="entity-link">IReservationConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxStrategy.html" data-type="entity-link">TaxStrategy</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});