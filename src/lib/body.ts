const validate = <T>(body: {[key: string]: any}) => {
    let result: {ok: boolean, prepared?: T, errors?: {[key: string]: {}}} = {ok: true};

    for(let field in body.fields){
        for(let rule in body.fields[field].rules){
            switch(rule){
                case 'minlength':
                    if(minlength(body.fields[field].value, body.fields[field].rules[rule])){
                        result.ok = false;
                        result.errors = {...result.errors, [field]: {minlength: {provided: body.fields[field].value.length, required: body.fields[field].rules[rule]}}};
                    }
                    break;
                case 'maxlength':
                    if(maxlength(body.fields[field].value, body.fields[field].rules[rule])){
                        result.ok = false;
                        result.errors = {...result.errors, [field]: {maxlength: {provided: body.fields[field].value.length, required: body.fields[field].rules[rule]}}};
                    }
                    break;
                case 'email':
                    if(email(body.fields[field].value)){
                        result.ok = false;
                        result.errors = {...result.errors, [field]: {email: true}};
                    }
                    break;
            }
        }
    }

    body.prepare && result.ok ? result.prepared = <T>prepare(body) : delete result.prepared;
    return result;
}

const minlength = (value: string, minlength: number) => {
    return value.length < minlength ? true : false;
}

const maxlength = (value: string, maxlength: number) => {
    return value.length > maxlength ? true : false;
}

const email = (value: string) => {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    return value.match(regex) === null ? true : false;
}

const prepare = <T>(body: {[key: string]: any}): T => {
    let prepared = {};

    for(let field in body.fields){
        prepared = {...prepared, [field]: body.fields[field].value};
    }

    return <T>prepared;
}

export default {validate};