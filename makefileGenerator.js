/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   makefileGenerator.js                               :+:    :+:            */
/*                                                     +:+                    */
/*   By: jkoers <jkoers@student.codam.nl>             +#+                     */
/*                                                   +#+                      */
/*   Created: 2020/11/26 22:52:21 by jkoers        #+#    #+#                 */
/*   Updated: 2020/11/28 23:31:01 by jkoers        ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const fs = require('fs')
const path = require('path')

function getPath(searchDir, filename) {
	// searchDir = searchDir.trim()
	// if (searchDir.indexOf('/') != -1) {
	// 	searchDir = searchDir.substring(0, searchDir.indexOf('/'))
	// }
	// return `${searchDir}/${filename}`
	return `$(SRCDIR)/${filename}`
}

const searchDir = process.argv.length > 2 ? process.argv[2] : '.'
let files = fs.readdirSync(searchDir)
files = files.filter((filename) => filename.match(/.c$/))
files = files.sort()
const varName = `SOURCES =\t`
const offset = ''.padStart(Math.floor((varName.length - 1) / 4), '\t')

let result = ''
result += varName
result += `${getPath(searchDir, files[0])} \\\n`
for (let i = 1; i < files.length - 1; i++) {
	result += `${offset}${getPath(searchDir, files[i])} \\\n`
}
result += `${offset}${getPath(searchDir, files[files.length - 1])}`
console.log(result)
