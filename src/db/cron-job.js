import dayjs from 'dayjs'

let cronTime = ''

async function setCronTime() {
  const now = dayjs().format()
  cronTime = now
}

async function checkCronTime() {
  return dayjs().isAfter(dayjs(cronTime).add(1, 'hour'))
}

export { checkCronTime, setCronTime, cronTime }
