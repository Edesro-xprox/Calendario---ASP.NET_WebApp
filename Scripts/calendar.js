class Calendar {
    constructor() {
        this.init();
    }
    init() {
        DevExpress.localization.locale('es');
        this.getInitData();
        this.styles();
        this.devex();
        this.events();
    }
    getInitData() {
        $.ajax({
            url: '/Evento/executeProceduresEvent',
            type: 'GET',
            data: {
                procedure: 'sps_event',
                parameters: {}
            },
            success: (res) => {
                alert(res);
            },
            error: (e) => {
                alert("Data no cargada");
            }
        });
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
                        dataField: 'subject',
                        label: { text: 'Asunto'},
                        editorType: 'dxTextBox',
                        editorOptions: {
                            maxLength: 100,
                            placeholder: 'Escriba un evento...'
                        }
                    },
                    {
                        colSpan: 1,
                        dataField: 'dateInit',
                        label: { text: 'Fecha inicio'},
                        editorType: 'dxDateBox',
                        editorOptions: {
                            type: 'datetime',
                            value: new Date()
                        }
                    },
                    {
                        colSpan: 1,
                        dataField: 'dateEnd',
                        label: { text: 'Fecha fin'},
                        editorType: 'dxDateBox',
                        editorOptions: {
                            type: 'datetime',
                            value: new Date()
                        }
                    },
                    {
                        colSpan: 2,
                        dataField: 'description',
                        label: { text: 'Descripción'},
                        editorType: 'dxTextArea',
                        editorOptions: {
                            maxLength: 300,
                            placeholder: 'Escriba una breve descripción...'
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
                                debugger
                                let valid = this.dx.frmCalendar.validate();
                                if (valid.isValid) {

                                    let data = this.dx.frmCalendar.option('formData');
                                    data.dateInit = new Date(data.dateInit);
                                    data.dateEnd = new Date(data.dateEnd);

                                    $.ajax({
                                        url: '/Evento/executeProceduresEvent',
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify({
                                            procedure: 'spi_event',
                                            parameters: data,
                                        }),
                                        success: (response) => {
                                            alerta("Evento registrado");
                                        },
                                        error: (e) => {
                                            alerta("Error en el servidor");
                                        }
                                    });
                                }
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
                        eventId: 1,
                        text: 'Helen1',
                        startDate: new Date('2024-08-01T16:30:00.000Z'),
                        endDate: new Date('2024-08-01T18:30:00.000Z'),
                    },
                    {
                        eventId: 2,
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
                },
                onCellContextMenu: (e) => {
                    e.event.preventDefault();
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