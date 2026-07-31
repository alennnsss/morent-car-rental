<template>
    <footer>
        <div class="footer">
            <div class="footer-logo-box">
                <h1 class="footer-logo__title">
                    MORENT
                </h1>
                <div class="footer-logo__desc">
                    <span>Our vision is to provide convenience</span>
                    <div>
                        <span>
                            and help increase your sales business.
                        </span>
                    </div>
                </div>    
            </div>
            <div class="footer-links">
                <div class="footer-links__item">
                    <h1>
                        About
                    </h1>
                    <div class="links-box">
                        <routerLink to="">
                            How it works
                        </routerLink>
                        <routerLink to="">
                            Featured
                        </routerLink>
                        <routerLink to="">
                            Partnership
                        </routerLink>
                        <routerLink to="">
                            Bussiness Relation
                        </routerLink>
                    </div>    
                </div>
                <div class="footer-links__item">
                    <h1>
                        Community
                    </h1>
                    <div class="links-box">
                        <routerLink to="">
                            Events
                        </routerLink>
                        <routerLink to="">
                            Blog
                        </routerLink>
                        <routerLink to="">
                            Podcast
                        </routerLink>
                        <routerLink to="">
                            Invite a friend
                        </routerLink>
                    </div>
                </div>
                <div class="footer-links__item">
                    <h1>
                        Socials
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
                <h1>&copy;2022 MORENT.All right reserved</h1>
            </div>
            <div class="policy-box">
                <router-link to="">
                    Privacy & Policy
                </router-link>
                <router-link to="">
                    Terms & Condition
                </router-link>
            </div>
        </div>
    </footer>
</template>

<script>

</script>

<style scoped>
    footer {
        max-height: 580px;
        gap: 36px;
        background-color: white;
    }
    .footer {
        width: 100%;
        max-height: 244px;
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
        height: 244px;
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
    footer {
        display: flex;
        flex-direction: column;
        padding: 80px 60px;
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