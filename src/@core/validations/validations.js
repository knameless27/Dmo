import { defineRule } from "vee-validate";
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  max as rule_max,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  numeric as rule_numeric,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
  min_value as rule_min_value,
  max_value as rule_max_value,
} from "@vee-validate/rules";

// eslint-disable-next-line object-curly-newline
import {
  validatorPositive,
  validatorUrlValidator,
  validatorPassword,
  validatorCreditCard,
} from "./validators";

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

export const required = defineRule("required", rule_required);

export const email = defineRule("email", rule_email);

export const min = defineRule("min", rule_min);

export const max = defineRule("max", rule_max);

export const confirmed = defineRule("confirmed", rule_confirmed);

export const regex = defineRule("regex", rule_regex);

export const between = defineRule("between", rule_between);

export const alpha = defineRule("alpha", rule_alpha);

export const integer = defineRule("integer", rule_integer);

export const decimal = defineRule(
  "decimal",
  (value, { decimals = "*", separator = "." } = {}) => {
    if (value === null || value === undefined || value === "") {
      return {
        valid: false,
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );

    return regex.test(value);
  }
);

export const digits = defineRule("digits", rule_digits);

export const alphaDash = defineRule("alpha-dash", rule_alpha_dash);

export const alphaNum = defineRule("alpha-num", rule_alpha_num);

export const length = defineRule("length", rule_length);

export const minValue = defineRule("min_value", rule_min_value);

export const maxValue = defineRule("max_value", rule_max_value);

export const numeric = defineRule("numeric", rule_numeric);

export const positive = defineRule("positive", validatorPositive);

export const credit = defineRule("credit-card", validatorCreditCard);

export const password = defineRule("password", validatorPassword);

export const url = defineRule("url", validatorUrlValidator);

const phoneRegex = /^(?:\+\d{1,2}\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const phone = defineRule('phone', (value) => {
  if (!value) return false;

  if (!phoneRegex.test(value)) return false;

  return true;
});