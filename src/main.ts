import * as path from 'path';
import * as cp from 'child_process';
import * as context from './context';
import * as installer from './installer';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    const lodev = await installer.install(inputs.version);
    core.startGroup(`Installing lodev ${inputs.version}...`);

    await exec.exec(`sudo setcap cap_net_bind_service=+eip ${lodev}`)

    if (inputs.installOnly) {
      const lodevDir = path.dirname(lodev);
      core.addPath(lodevDir);
      core.info(`lodev ${inputs.version} installed successfully`);
      core.debug(`Added ${lodevDir} to PATH`);
      core.endGroup();
      return;
    }

    if (installer.useSudo()) {
      await exec.exec(`sudo ${lodev} install`);
    } else {
      await exec.exec(`${lodev} install`);
    }


    if (context.osPlat == 'linux') {
     const s = await installer.ipSet();
     if (!s) {
      throw new Error(`IP not set`);
     }
    }
    core.info(`lodev ${inputs.version} installed successfully`);
    core.endGroup();

    core.startGroup(`Starting lodev...`);
    var child: cp.ChildProcess
    if (installer.useSudo()) {
      child = cp.spawn('sudo', [lodev, 'start'], { detached: true, windowsHide: true, shell: true, stdio: 'ignore' });
    } else {
      child = cp.spawn(lodev, ['start'], { detached: true, windowsHide: true, shell: true, stdio: 'ignore' });
    }
    child.unref();
    core.info(`lodev started`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
