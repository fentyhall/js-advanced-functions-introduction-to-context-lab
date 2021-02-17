function createEmployeeRecord(record) {
    let employeeRecord = {
        firstName: record[0], 
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arr) {
    return arr.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, datestamp) {
    let [date, hour] = datestamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        date, 
        hour: parseInt(hour)
    })

    return employee;
}

function createTimeOutEvent(employee, datestamp) {
    let [date, hour] = datestamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        date, 
        hour: parseInt(hour)
    })

    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let endTime = employee.timeOutEvents.find(obj => obj.date === date);
    let startTime = employee.timeInEvents.find(obj => obj.date === date);

    return (endTime.hour - startTime.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    let hoursTotal = hoursWorkedOnDate(employee, date);

    return hoursTotal * employee.payPerHour;
}

function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(obj => obj.date);
    let payCheck = allDates.reduce(function(total, eachDate) {
        return total + wagesEarnedOnDate(employee, eachDate)
    }, 0);

    return payCheck;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(arr) {
    return arr.reduce(function(total, employee) {
        return total + allWagesFor(employee)
    }, 0)
}