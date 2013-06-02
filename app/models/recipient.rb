class Recipient < ActiveRecord::Base
  attr_accessible :active, :case, :phone, :reminder_date, :report_attributes, :notification_attributes
  has_and_belongs_to_many :reports
  has_and_belongs_to_many :conversations
  has_and_belongs_to_many :programs
  has_many :notifications

  attr_accessible :report_ids
  attr_accessible :conversation_ids
  attr_accessible :program_ids
  attr_accessible :notification_ids

  accepts_nested_attributes_for :notifications, :allow_destroy => true
  accepts_nested_attributes_for :reports

  # validates :phone, :presence => true

  def self.import(file)
	  spreadsheet = open_spreadsheet(file)
	  header = spreadsheet.row(1)
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      formatDate = Date.strptime(row["reminder_date"], '%m/%d/%Y')
      @report = Report.where(report_type: row['report_type']).first_or_initialize
      recipient = where(phone: row["phone"])
        .first_or_initialize(row.to_hash.slice(*accessible_attributes))
      #assign related reports to our current report
      recipient.reports << @report
      recipient.notifications.where(send_date: formatDate, report_id: @report.id, recipient_id: recipient.id)
	      .first_or_initialize(row.to_hash.slice(*recipient.notifications.accessible_attributes))
      recipient.save
      
	  end
	end

	def self.open_spreadsheet(file)
	  case File.extname(file.original_filename)
		  when ".csv" then Roo::Csv.new(file.path, nil, :ignore)
		  when ".xls" then Roo::Excel.new(file.path, nil, :ignore)
		  when ".xlsx" then Roo::Excelx.new(file.path, nil, :ignore)
		  else raise "Unknown file type: #{file.original_filename}"
	  end
	end
end
