---
title: Home
body_classes: modular
heading:
    display: false
    bread: false
    bgcol_theme: true
content:
    order:
        dir: asc
        by: folder
    items: '@self.modular'
form:
    title: home-contact
    name: form-contact
    action: /home
    fields:
        -
            name: name
            label: name
            placeholder: 'Enter your name'
            type: text
            validate:
                required: true
        -
            name: email
            label: Email
            placeholder: 'Enter your email'
            type: email
            validate:
                required: true
    buttons:
        -
            type: submit
            value: 'Subscribe Now'
    process:
        -
            email:
                from: '{{ config.plugins.email.from }}'
                to: ['{{ config.plugins.email.to }}', '{{ form.value.email }}']
                subject: '[Home Gravi-k Subscribe] {{ form.value.name|e }}'
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            save:
                fileprefix: contact-Home-gravi-k
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            display: /thank-you-subscribe
---

