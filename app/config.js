'use strict';

angular.module('blockmarket.appconfig', [])
    .constant("APP_CONFIG", {
            VERSION: "0.1 beta4",
            THEME: "cerulean", //preview and full template list here: https://bootswatch.com
            COLOR: "#FC3A99",
    })
    .constant("PGP_PUBLIC_KEY",
            "-----BEGIN PGP PUBLIC KEY BLOCK-----\n" +
            "Version: GnuPG/MacGPG2 v2.0.22 (Darwin)\n" +
            "\n" +
            "mQENBFUUJFYBCAC+3Mq+Fr5fcxcPGmBuKhp76SzJ34k5rinj0SaFu/Br8OrgH0hQ\n" +
            "R3aZN0G5gE8nLDIMvRr0frH4DnmP2Bss62JpVAoaeSVzWL1Js29i2axUjWAm1Ds+\n" +
            "0zxbBzyz6X72xqyWIny2qxcZBIrTokKvps3zrNrW53e3bcO3qjvytokgfP2hoWsP\n" +
            "7w3xrH87hcHWG0dIKmJqNYLrkSfL/HshYpXZV5RSXOlQ2iftosBbMgEM5R79ks/O\n" +
            "WJ3j6j4SJthlH/bL4LhZuuWID67rlAE71dnGsS4rTGAu4VubW6XmjqKAAlh5kgRx\n" +
            "fDzHB0zPi6DP3yufpQi5v/lhyUszv0knjmHhABEBAAG0TVN5c2NvaW4gKEtleSBm\n" +
            "b3IgcHVyY2hhc2luZyBmcm9tIFN5c2NvaW4ncyBvd24gYmxvY2ttYXJrZXQpIDxk\n" +
            "YW5Ac3lzY29pbi5vcmc+iQE3BBMBCgAhBQJVFCRWAhsDBQsJCAcDBRUKCQgLBRYC\n" +
            "AwEAAh4BAheAAAoJEDqc8SKDae5DxM8H/2ilmMdXwOXqC3jTtGRpvvw69kPP14yd\n" +
            "fwpltKZghn9hO3beK5V8t20sFyEf4IgED+oA3qm1DtIg8lgRQ1Nu7Zv/WQYhmFcI\n" +
            "pyREh2vS7X3TUuTmQJNOJVObRkRjU24WO8NOK02VK8kdkDcr3BaPIpywWTmkzIPO\n" +
            "Z5c2JKhP1h6YCUMVqf0onbTg/yEzNuTMgx5z/6r6EbYHCHty5KR3TRwL+uJB994w\n" +
            "Hn8KXaI3WTXspAYr+FClcYoIHcijvS4P3Bx12mQtevK2x4Ea0vCh52NyJ89hm7z+\n" +
            "Qosj1U1F/PDrTN15W4dz5Ew/5CpiQz2rdh+IP969MdNJBVsRcJDeCA25AQ0EVRQk\n" +
            "VgEIALIHS9GSXrlLr9MGYFwlmHcQeiYMRHg3PT2z1czjdAk9dBmfbZP+uLLMU1SE\n" +
            "BSHq7Pq5KnwwO5mSJOf788PSJP22yRJC6tFOGxk6dFSQqhqk1eCIc4g59P/vDHgI\n" +
            "RVk3XcJE+HPLU5sdefgO40LadwxHK8rwFLJjlt2TH3md4Nqd+gbdnpgGGs6awmnF\n" +
            "jY4wTlLGf5F8m1BiRcEcsa4sLJsBxOCVq4fN9PArLX2lfP4mQEhCi3iyMRjpym19\n" +
            "IPmL45B/xHanO2zNxE6T2fscJxDlszxWit+noS9/1cKNxeENvihdEuqDAQtB+5wx\n" +
            "/2RVTI4vVpWDAB3Btt0Ytid37l8AEQEAAYkBHwQYAQoACQUCVRQkVgIbDAAKCRA6\n" +
            "nPEig2nuQ+OPB/9wj5/Og/MSgpYGkE81rogtemsA+D3D+nzXERLvRmYLVpMr8fTp\n" +
            "cYK0s1EZmpvCpUSc2XMhWCzObqXQM+LfpjRshRNUOpOf8JiYgpLlKsuT7O/AVham\n" +
            "tYJpmrp+7fzbuihvYEGEz9ZkWaOFTvBoZ9q/AHNLehSWvLciJzci4l0Nd8sGqHMS\n" +
            "B52Wo9Kp9K3PpWA1MDWF7eTMRgzTOVU6PoFAfV0iyTwZ/VslF1zNedoxAA5acq5w\n" +
            "E1kynpGpIuSIM2KDz9JT25tynoXAN3oM7/Gm5WAnEa6i7KbExO0KX9dEN2aPXvkK\n" +
            "eSDgbI56qqyjaJWVlj07hTwEva/y0GHyqhCl\n" +
            "    =bM1m\n" +
            "-----END PGP PUBLIC KEY BLOCK-----\n"
    );

angular.module('blockmarket.marketconstants', [])
    .constant("FEATURED_ITEMS",["056c7958b7b8b77e"])
    .constant("BANNED_ITEMS", ["01fad009586507dd00", "7326f26d6a9f3bc800"])
    .constant("EVENTS", {
        featured_items_loaded: "featured_items_loaded",
        all_items_loaded: "all_items_loaded",
        all_categories_loaded: "all_categories_loaded",
        reload_admin: "reload_admin"
    });