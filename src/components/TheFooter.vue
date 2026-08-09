<template>
    <footer>
        <div class="footer">
            <div class="footer-logo-box">
                <h1 class="footer-logo__title">
                    MORENT
                </h1>
                <div class="footer-logo__desc">
                    <span>{{ $t('our_vision') }}</span>
                    <div>
                        <span>
                            {{ $t('help') }}
                        </span>
                    </div>
                </div>    
            </div>
            <div class="footer-links">
                <div class="footer-links__item">
                    <h1>
                        {{ $t('about') }}
                    </h1>
                    <div class="links-box">
                        <routerLink to="">
                            {{ $t('how_works') }}
                        </routerLink>
                        <routerLink to="">
                            {{ $t('featured') }}
                        </routerLink>
                        <routerLink to="">
                            {{ $t('partnership') }}
                        </routerLink>
                        <routerLink to="">
                            {{ $t('bussiness_rel')}}
                        </routerLink>
                    </div>    
                </div>
                <div class="footer-links__item">
                    <h1>
                        {{ $t('community') }}
                    </h1>
                    <div class="links-box">
                        <routerLink to="">
                            {{ $t('events') }}
                        </routerLink>
                        <routerLink to="">
                            {{ $t('blog') }}
                        </routerLink>
                        <routerLink to="">
                            {{ $t('podcast')}}
                        </routerLink>
                        <routerLink to="">
                            {{ $t('invite')}}
                        </routerLink>
                    </div>
                </div>
                <div class="footer-links__item">
                    <h1>
                        {{ $t('socials') }}
                    </h1>
                    <div class="links-box">
                        <a target="blank" href="https://discord.com/">
                            Discord
                        </a>
                        <a target="blank" href="https://instagram.com/">
                            Instagram
                        </a>
                        <a target="blank" href="https://twitter.com/">
                            Twitter
                        </a>
                        <a target="blank" href="https://facebook.com/">
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer__border"></div>
        <div class="right-box">
            <div>
                <h1>&copy;2022 MORENT.{{ $t('rights') }}</h1>
            </div>
            <div class="policy-box">
                <router-link to="">
                    {{ $t('privacy')}}
                </router-link>
                <router-link to="">
                    {{ $t('terms') }}
                </router-link>
            </div>
        </div>
    </footer>
</template>

<script>

</script>

<style scoped>
    footer {
        display: flex;
        flex-direction: column;
        padding: 80px 60px;
        height: 100%;
        justify-content: space-around;
        gap: 36px;
    }
    .footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .footer-logo-box {
        width: 30%;
        display: flex;
        gap: 16px;
        flex-direction: column;
    }
    .footer-logo__title {
        color: #3563E9;
        font-weight: 700;
        font-size: 32px;
        flex-shrink: 0;
    }
    .footer-logo__desc {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .footer-links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 3fr));
        gap: 60px;
        width: 50%;
    }
    .footer-links__item {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
    }
    .links-box {
        display: flex;
        flex-direction: column;
        gap: 24px
    }
    .footer__border {
        border: 1px solid #13131329;
    }

    .right-box {
        display: flex;
        justify-content: space-between;
    }
    .policy-box {
        display: flex;
        gap: 60px;
    }
    .policy-box a {
        color: #1A202C;
        font-weight: 600;
    }
    span {
        color:#13131399;
    }
    a {
        text-decoration: none;
        color: #13131399;
    }
    a:hover {
        color:#3563E9;
    }
</style>