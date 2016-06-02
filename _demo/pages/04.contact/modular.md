---
title: Contact
body_classes: modular
heading:
    display: false
    bread: false
    bgcol_theme: true
content:
    order:
        dir: desc
        by: folder
    items: '@self.modular'
form:
    title: 'Form contact'
    name: form-contact
    action: /contact
    fields:
        -
            name: name
            label: Name
            placeholder: 'Enter your name'
            autocomplete: 'on'
            type: text
            validate:
                required: true
        -
            name: email
            label: Email
            placeholder: 'Enter your email address'
            type: email
            validate:
                required: true
        -
            name: message
            label: Message
            placeholder: 'Enter your message'
            type: textarea
    buttons:
        -
            type: submit
            value: Submit
    process:
        -
            email:
                from: '{{ config.plugins.email.from }}'
                to: ['{{ config.plugins.email.to }}', '{{ form.value.email }}']
                subject: '[Site Contact Form] {{ form.value.name|e }}'
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            save:
                fileprefix: contact-
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            display: /thank-you
---

