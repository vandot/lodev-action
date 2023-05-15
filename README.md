## About

GitHub Action for [lodev](https://github.com/vandot/lodev), a simple reverse proxy server for local development.
___

* [Usage](#usage)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [Limitation](#limitation)
* [License](#license)

## Usage

```yaml
name: example

on:
  push:

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: vandot/lodev-action@v1
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name          | Type    | Default   | Description                     |
|---------------|---------|-----------|---------------------------------|
| `version`     | String  | `latest`   | lodev version. Example: `0.1.2` |
| `install-only`| Bool    | `false`   | just install lodev              |

## Limitation

This action is not available for Windows [virtual environment].
`lodev` supports Windows while this action still doesn't.

## License

BSD-3-Clause. See `LICENSE` for more details.
