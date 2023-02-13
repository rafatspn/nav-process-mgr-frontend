/*global FB*/
import { useEffect, useState } from 'react'

const _extends =
    Object.assign ||
    function (target) {
        for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i]
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    }

const useFacebook = function () {
    const appId = '654290276302520' //process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    const facebook = {
        login: async () => {
            const { authResponse, status } = await new Promise((resolve) =>
                window.FB.login(resolve, {
                    scope: 'public_profile, email, pages_show_list,pages_read_engagement, pages_manage_engagement'
                })
            )
            if (!authResponse) return { status }
            return new Promise((resolve) =>
                window.FB.api(
                    '/me',
                    {
                        locale: 'en_US',
                        fields: 'name,email,picture'
                    },
                    (me) => {
                        _extends(me, authResponse)
                        resolve(me)
                    }
                )
            )
        }
    }

    return [facebook]
}

export default useFacebook
