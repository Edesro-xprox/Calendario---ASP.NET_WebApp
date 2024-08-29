class Calendar {
    constructor() {
        this.init();
    }
    init() {
        DevExpress.localization.locale('es');
        this.styles();
        this.devex();
        this.events();
    }
    styles() {
        let css = document.createElement('style');
        css.id = 'xprox_calendar';
        css.textContent = `
            
        `;
    }
    devex() {
        this.dx = {
            tbarCalendar : null,
            schdCalendar: null,
            frmCalendar: null,
            mdlCalendar : null
        }

        this.dx.frmCalendar = $('<div>')
            .dxForm({
                colCount: 2,
                labelLocation: 'top',
                items: [
                    {
                        colSpan: 2,
                        label: { text: 'Asunto'},
                        editorType: 'dxTextBox',
                        editorOptions: {

                        }
                    },
                    {
                        colSpan: 1,
                        label: { text: 'Fecha inicio'},
                        editorType: 'dxDateBox',
                        editorOptions: {

                        }
                    },
                    {
                        colSpan: 1,
                        label: { text: 'Fecha fin'},
                        editorType: 'dxDateBox',
                        editorOptions: {

                        }
                    },
                    {
                        colSpan: 2,
                        label: { text: 'Descripción'},
                        editorType: 'dxTextArea',
                        editorOptions: {

                        }
                    }
                ]
            }).dxForm('instance');

        this.dx.mdlCalendar = $('<div>')
            .dxPopup({
                title: 'Nuevo evento',
                width: 600,
                height:400,
                resizeEnabled: false,
                contentTemplate: () => this.dx.frmCalendar.element(),
                toolbarItems: [
                    {
                        widget: 'dxButton',
                        options: {
                            text: 'Cancelar',
                            icon: 'close',
                            type: 'warning',
                            onClick: (e) => {
                                this.dx.mdlCalendar.hide();
                            }
                        },
                        toolbar: "bottom",
                        location:"after"
                    },
                    {
                        widget: 'dxButton',
                        options: {
                            text: 'Guardar',
                            icon: 'save',
                            type: 'success',
                            onClick: (e) => {

                            }
                        },
                        toolbar: "bottom",
                        location: "after"
                    },
                ]
            }).dxPopup('instance');

        this.dx.tbarCalendar = $('<div>')
            .addClass('mb-2 card card-body')
            .dxToolbar({
                items: [
                    {
                        location: 'before',
                        text: () => {
                            let tbarDate = this.formatDate(new Date());
                            tbarDate = tbarDate.charAt(0).toUpperCase(0) + tbarDate.slice(1);
                            return tbarDate;
                        }
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            text: 'Nuevo evento',
                            icon: 'event',
                            type: 'success',
                            onClick: (e) => {
                                this.dx.mdlCalendar.show();
                            }
                        }
                    }
                ]
            }).dxToolbar('instance');

        this.dx.schdCalendar = $('<div>')
            .addClass('calendar card card-body')
            .dxScheduler({
                dataSource: [
                    {
                        text: 'Helen1',
                        startDate: new Date('2024-08-01T16:30:00.000Z'),
                        endDate: new Date('2024-08-01T18:30:00.000Z'),
                    },
                    {
                        text: 'Helen2',
                        startDate: new Date('2024-08-10T16:30:00.000Z'),
                        endDate: new Date('2024-08-11T18:30:00.000Z'),
                    }
                ],
                views: [
                    { type: "day", name:"Día"},
                    { type: "month", name:"Mes"},
                ],
                currentView: "month",
                currentDate: new Date(),
                showAllDayPanel: true,
                height: 600,
                onCellClick: (e) => {
                    let tbarDate = this.formatDate(e.cellData.startDate);
                    this.dx.tbarCalendar.option('items[0].text', tbarDate);
                },
                onAppointmentFormOpening: (e) => {
                    e.cancel = true ;
                }
            }).dxScheduler('instance');

        $('.calendarContainer').append(
            this.dx.tbarCalendar.element(),
            this.dx.schdCalendar.element(),
            this.dx.mdlCalendar.element()
        );

        this.dx.schdCalendar.repaint();
    }
    events() {
        $('.dx-scheduler-date-table-cell').dblclick(() => {
            this.dx.mdlCalendar.show();
        });
    }
    formatDate(date) {
        let dateFormat =  date.toLocaleDateString('es-ES', { month: 'long', weekday: 'long', day: '2-digit' });
        dateFormat = dateFormat.charAt(0).toUpperCase(0) + dateFormat.slice(1);
        return dateFormat;
    }
}

export default Calendar;