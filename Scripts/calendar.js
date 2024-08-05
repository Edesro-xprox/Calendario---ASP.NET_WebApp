class Calendar {
    constructor() {
        this.init();
    }
    init() {
        DevExpress.localization.locale('es');
        this.styles();
        this.devex();
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
                height:300,
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
                        location: 'after'
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
                        location: 'after'
                    },
                ]
            }).dxPopup('instance');

        this.dx.tbarCalendar = $('<div>')
            .addClass('mb-2')
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
            .addClass('calendar')
            .dxScheduler({
                dataSource: [],
                views: ["day", "week", "month"],
                currentView: "week",
                currentDate: new Date(),
                showAllDayPanel: true,
                height: 600,
                onCellClick: (e) => {
                    let tbarDate = this.formatDate(e.cellData.startDate);
                    this.dx.tbarCalendar.option('items[0].text', tbarDate);
                },
                onAppointmentFormOpening: (e) => {
                    e.cancel = true;
                }
            }).dxScheduler('instance');

        $('.calendarContainer').append(
            this.dx.tbarCalendar.element(),
            this.dx.schdCalendar.element(),
            this.dx.mdlCalendar.element()
        );

        this.dx.schdCalendar.repaint();
    }

    formatDate(date) {
        let dateFormat =  date.toLocaleDateString('es-ES', { month: 'long', weekday: 'long', day: '2-digit' });
        dateFormat = dateFormat.charAt(0).toUpperCase(0) + dateFormat.slice(1);
        return dateFormat;
    }
}

export default Calendar;