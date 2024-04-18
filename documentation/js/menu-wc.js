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
                    <a href="index.html" data-type="index-link">angular-boilerplate-v17 documentation</a>
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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' : 'data-bs-target="#xs-components-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' :
                                            'id="xs-components-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' : 'data-bs-target="#xs-directives-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' :
                                        'id="xs-directives-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' }>
                                        <li class="link">
                                            <a href="directives/ChangeBgColorOnClickDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangeBgColorOnClickDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' : 'data-bs-target="#xs-pipes-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' :
                                            'id="xs-pipes-links-module-AppModule-9d81e6fc4f5d7ad18e20669816896c430222ac556d6eb2a8d7f8eaaf9b5e6bf3444ef6f8d861d4b4e158a598c70b2c8a1baad9b7f6709c92cf059a6aba2a2a11"' }>
                                            <li class="link">
                                                <a href="pipes/UpperCasePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpperCasePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiServiceService.html" data-type="entity-link" >ApiServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CacheStorageService.html" data-type="entity-link" >CacheStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigSettings.html" data-type="entity-link" >ConfigSettings</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/MyHttpInterceptorInterceptor.html" data-type="entity-link" >MyHttpInterceptorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Array.html" data-type="entity-link" >Array</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/String.html" data-type="entity-link" >String</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});