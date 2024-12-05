import axios from 'axios'

export function formDataToObjectArray(formData) {
    var object = {}
    formData.forEach(function (value, key) {
        object[key] = value
    })

    return object
}

export async function loadState(name) {
    return await getApiJsonDataPost("state/load", { name: name })
}

export async function saveState(name, data) {
    return await getApiJsonDataPost("state/save", { name: name, data: JSON.stringify(data) })
}

export async function getApiJsonDataPost(route, data = {}) {
    const response = await axios.post("/api/" + route, data, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'same-origin'
    })
    return response.data
}

export async function getApiJsonDataGet(route, data = {}) {
    const response = await axios.get("/api/" + route, data, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'same-origin'
    })
    return response.data
}

export async function sendFormDataToApi(event, route) {
    event.preventDefault()
    const data = formDataToObjectArray(new FormData(event.target))
    const result = await getApiJsonDataPost(route, data)
    return { data: data, result: result }
}

export function toggleVisibility(elementId) {
    var currentClass = document.getElementById(elementId).className
    document.getElementById(elementId).className = currentClass == "d-none" ? "" : "d-none"
}

export function setVisibility(elementId, visible) {
    document.getElementById(elementId).className = visible ? "" : "d-none"
}

export function setClass(elementId, className) {
    const element = document.getElementById(elementId)
    if (element)
        element.className = className
}

export function getInputValue(elementId) {
    return document.getElementById(elementId).value
}

export function setInputValue(elementId, value) {
    document.getElementById(elementId).value = value
}

export function removeElement(elementId) {
    document.getElementById(elementId).remove()
}

export function toggleCheckboxes(className, value) {
    const elements = document.getElementsByClassName(className)
    var elementIndex = 0, elementsCount = elements.length
    while (elementIndex < elementsCount) {
        const element = elements.item(elementIndex)
        element.checked = value ? !value : value
        element.disabled = !value
        elementIndex++
    }
}

export function URLQueryBuilder(route, query) {
    const searchParams = new URLSearchParams(query)

    this.addQuery = function (key, value) {
        if (value)
            searchParams.set(key, value)
        return this
    }

    this.navigate = function () {
        window.location.href = `${route}?${searchParams.toString()}`
    }

    this.getUrl = function () {
        return `${route}?${searchParams.toString()}`
    }
}

export function copyToClipboard(id) {
    const input = document.createElement("textarea")
    input.value = document.getElementById(id).value
    document.body.appendChild(input)
    input.select()
    document.execCommand("Copy")
    input.remove()
}

export function scrollToBottom(timeout) {
    setTimeout(() => {
        window.scroll({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        })
        //window.scrollTo(0, document.body.scrollHeight)
    }, timeout)
}