import { outDir, projectRoot, btRoot } from './utils/paths'
import glob from 'fast-glob'
import { Project, ModuleKind, ScriptTarget, SourceFile } from 'ts-morph'
import path from 'path'
import fs from 'fs/promises'
import { parallel, series } from 'gulp'
import { run, withTaskName } from './utils'
import { buildConfig } from './utils/config'
import { copy } from 'fs-extra'
import { definedReplaceAll } from './utils/replace-all'

export const genEntryTypes = async () => {
    const files = await glob('*.ts', {
        cwd: btRoot,
        absolute: true,
        onlyFiles: true,
    })
    const project = new Project({
        compilerOptions: {
            declaration: true,
            module: ModuleKind.ESNext,
            allowJs: true,
            emitDeclarationOnly: true,
            noEmitOnError: false,
            outDir: path.resolve(outDir, 'typings'),
            target: ScriptTarget.ESNext,
            rootDir: btRoot,
            strict: false,
        },
        skipFileDependencyResolution: true,
        tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
        skipAddingFilesFromTsConfig: true,
    })
    const sourceFiles: SourceFile[] = []
    files.map(f => {
        const sourceFile = project.addSourceFileAtPath(f)
        sourceFiles.push(sourceFile)
    })
    await project.emit({
        emitOnlyDtsFiles: true,
    })
    const tasks = sourceFiles.map(async sourceFile => {
        const emitOutput = sourceFile.getEmitOutput()
        for (const outputFile of emitOutput.getOutputFiles()) {
            const filepath = outputFile.getFilePath()
            await fs.mkdir(path.dirname(filepath), { recursive: true })
            // outputFile.getText().replaceAll('@beeboat', '.')
            await fs.writeFile(
                filepath,
                definedReplaceAll(outputFile.getText(), '@beeboat', '.'),
                'utf8',
            )
        }
    })
    await Promise.all(tasks)
}
export const copyEntryTypes = () => {
    const src = path.resolve(outDir, 'typings')
    const cpEntryTypes = module =>
        parallel(
            withTaskName(`copyEntryTypes:${module}`, () =>
                copy(src, buildConfig[module].output.path, { recursive: true }),
            ),
        )
    return parallel(cpEntryTypes('esm'), cpEntryTypes('cjs'))
}

export const genTypes = series(genEntryTypes, copyEntryTypes())
