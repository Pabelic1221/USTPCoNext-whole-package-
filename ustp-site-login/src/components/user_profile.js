import React, { Component } from "react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      error: null,
      // Add states for AccountSettings component
      username: '',
      name: '',
      email: '',
      company: '',
      bio: '',
      birthday: '',
      country: 'Philippines',
      phone: '',
      website: '',
      twitter: '',
      facebook: '',
      googlePlus: '',
      linkedin: '',
      instagram: '',
      emailCommentNotification: true,
      emailForumNotification: true,
      emailFollowNotification: false,
      newsAndAnnouncements: true,
      weeklyProductUpdates: false,
      weeklyBlogDigest: true
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  // Define event handlers for AccountSettings component
  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleCheckboxChange = (field) => {
    this.setState((prevState) => ({ [field]: !prevState[field] }));
  };

  // Step 2: Define the AccountSettings component
  AccountSettings = () => {
    const { username, name, email, company, bio, birthday, country, phone, website, twitter, facebook, googlePlus, linkedin, instagram,
      emailCommentNotification, emailForumNotification, emailFollowNotification, newsAndAnnouncements, weeklyProductUpdates, weeklyBlogDigest } = this.state;

    return React.createElement(
      'div', { className: 'container light-style flex-grow-1 container-p-y' },
      React.createElement('h4', { className: 'font-weight-bold py-3 mb-4' }, 'Account settings'),
      React.createElement(
        'div', { className: 'card overflow-hidden' },
        React.createElement(
          'div', { className: 'row no-gutters row-bordered row-border-light' },
          React.createElement(
            'div', { className: 'col-md-3 pt-0' },
            React.createElement(
              'div', { className: 'list-group list-group-flush account-settings-links' },
              React.createElement('a', { className: 'list-group-item list-group-item-action active', 'data-toggle': 'list', href: '#account-general' }, 'General'),
              React.createElement('a', { className: 'list-group-item list-group-item-action', 'data-toggle': 'list', href: '#account-change-password' }, 'Change password'),
              React.createElement('a', { className: 'list-group-item list-group-item-action', 'data-toggle': 'list', href: '#account-info' }, 'Info'),
              React.createElement('a', { className: 'list-group-item list-group-item-action', 'data-toggle': 'list', href: '#account-social-links' }, 'Social links'),
              React.createElement('a', { className: 'list-group-item list-group-item-action', 'data-toggle': 'list', href: '#account-connections' }, 'Connections'),
              React.createElement('a', { className: 'list-group-item list-group-item-action', 'data-toggle': 'list', href: '#account-notifications' }, 'Notifications')
            )
          ),
          React.createElement(
            'div', { className: 'col-md-9' },
            React.createElement(
              'div', { className: 'tab-content' },
              React.createElement(
                'div', { className: 'tab-pane fade active show', id: 'account-general' },
                React.createElement(
                  'div', { className: 'card-body media align-items-center' },
                  React.createElement('img', { src: 'https://bootdey.com/img/Content/avatar/avatar1.png', alt: '', className: 'd-block ui-w-80' }),
                  React.createElement(
                    'div', { className: 'media-body ml-4' },
                    React.createElement(
                      'label', { className: 'btn btn-outline-primary' },
                      'Upload new photo',
                      React.createElement('input', { type: 'file', className: 'account-settings-fileinput' })
                    ), ' ',
                    React.createElement('button', { type: 'button', className: 'btn btn-default md-btn-flat' }, 'Reset'),
                    React.createElement('div', { className: 'text-light small mt-1' }, 'Allowed JPG, GIF or PNG. Max size of 800K')
                  )
                ),
                React.createElement('hr', { className: 'border-light m-0' }),
                React.createElement(
                  'div', { className: 'card-body' },
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Username'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control mb-1',
                      value: username,
                      onChange: (e) => this.handleInputChange('username', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Name'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: name,
                      onChange: (e) => this.handleInputChange('name', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'E-mail'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control mb-1',
                      value: email,
                      onChange: (e) => this.handleInputChange('email', e.target.value)
                    }),
                    React.createElement(
                      'div', { className: 'alert alert-warning mt-3' },
                      'Your email is not confirmed. Please check your inbox.', React.createElement('br', null),
                      React.createElement('a', { href: 'javascript:void(0)' }, 'Resend confirmation')
                    )
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Company'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: company,
                      onChange: (e) => this.handleInputChange('company', e.target.value)
                    })
                  )
                )
              ),
              React.createElement(
                'div', { className: 'tab-pane fade', id: 'account-change-password' },
                React.createElement(
                  'div', { className: 'card-body pb-2' },
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Current password'),
                    React.createElement('input', { type: 'password', className: 'form-control' })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'New password'),
                    React.createElement('input', { type: 'password', className: 'form-control' })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Repeat new password'),
                    React.createElement('input', { type: 'password', className: 'form-control' })
                  )
                )
              ),
              React.createElement(
                'div', { className: 'tab-pane fade', id: 'account-info' },
                React.createElement(
                  'div', { className: 'card-body pb-2' },
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Bio'),
                    React.createElement('textarea', {
                      className: 'form-control',
                      rows: 5,
                      value: bio,
                      onChange: (e) => this.handleInputChange('bio', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Birthday'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: birthday,
                      onChange: (e) => this.handleInputChange('birthday', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Country'),
                    React.createElement(
                      'select', {
                        className: 'custom-select',
                        value: country,
                        onChange: (e) => this.handleInputChange('country', e.target.value)
                      },
                      React.createElement('option', null, 'USA'),
                      React.createElement('option', null, 'Canada'),
                      React.createElement('option', null, 'UK'),
                      React.createElement('option', null, 'Germany'),
                      React.createElement('option', null, 'France')
                    )
                  )
                ),
                React.createElement('hr', { className: 'border-light m-0' }),
                React.createElement(
                  'div', { className: 'card-body pb-2' },
                  React.createElement('h6', { className: 'mb-4' }, 'Contacts'),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Phone'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: phone,
                      onChange: (e) => this.handleInputChange('phone', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Website'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: website,
                      onChange: (e) => this.handleInputChange('website', e.target.value)
                    })
                  )
                )
              ),
              React.createElement(
                'div', { className: 'tab-pane fade', id: 'account-social-links' },
                React.createElement(
                  'div', { className: 'card-body pb-2' },
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Twitter'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: twitter,
                      onChange: (e) => this.handleInputChange('twitter', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Facebook'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: facebook,
                      onChange: (e) => this.handleInputChange('facebook', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Google+'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: googlePlus,
                      onChange: (e) => this.handleInputChange('googlePlus', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'LinkedIn'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: linkedin,
                      onChange: (e) => this.handleInputChange('linkedin', e.target.value)
                    })
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { className: 'form-label' }, 'Instagram'),
                    React.createElement('input', {
                      type: 'text',
                      className: 'form-control',
                      value: instagram,
                      onChange: (e) => this.handleInputChange('instagram', e.target.value)
                    })
                  )
                )
              ),
              React.createElement(
                'div', { className: 'tab-pane fade', id: 'account-connections' },
                React.createElement(
                  'div', { className: 'card-body' },
                  React.createElement(
                    'button', { type: 'button', className: 'btn btn-twitter' },
                    'Connect to ', React.createElement('strong', null, 'Twitter')
                  )
                ),
                React.createElement('hr', { className: 'border-light m-0' }),
                React.createElement(
                  'div', { className: 'card-body' },
                  React.createElement('h5', { className: 'mb-2' },
                    React.createElement('a', { href: 'javascript:void(0)', className: 'float-right text-muted text-tiny' },
                      React.createElement('i', { className: 'ion ion-md-close' }), ' Remove'
                    ),
                    React.createElement('i', { className: 'ion ion-logo-google text-google' }), ' You are connected to Google:'
                  ),
                  React.createElement('a', { href: '/cdn-cgi/l/email-protection', className: '__cf_email__', 'data-cfemail': 'f9979498818e9c9595b994989095d79a9694' }, '[email&#160;protected]')
                ),
                React.createElement('hr', { className: 'border-light m-0' }),
                React.createElement(
                  'div', { className: 'card-body' },
                  React.createElement(
                    'button', { type: 'button', className: 'btn btn-facebook' },
                    'Connect to ', React.createElement('strong', null, 'Facebook')
                  )
                ),
                React.createElement('hr', { className: 'border-light m-0' }),
                React.createElement(
                  'div', { className: 'card-body' },
                  React.createElement(
                    'button', { type: 'button', className: 'btn btn-instagram' },
                    'Connect to ', React.createElement('strong', null, 'Instagram')
                  )
                )
              ),
              React.createElement(
                'div', { className: 'tab-pane fade', id: 'account-notifications' },
                React.createElement(
                  'div', { className: 'card-body pb-2' },
                  React.createElement('h6', { className: 'mb-4' }, 'Activity'),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement(
                      'label', { className: 'switcher' },
                      React.createElement('input', {
                        type: 'checkbox',
                        className: 'switcher-input',
                        checked: emailCommentNotification,
                        onChange: () => this.handleCheckboxChange('emailCommentNotification')
                      }),
                      React.createElement(
                        'span', { className: 'switcher-indicator' },
                        React.createElement('span', { className: 'switcher-yes' }), React.createElement('span', { className: 'switcher-no' })
                      ),
                      React.createElement('span', { className: 'switcher-label' }, 'Email me when someone comments on my article')
                    )
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement(
                      'label', { className: 'switcher' },
                      React.createElement('input', {
                        type: 'checkbox',
                        className: 'switcher-input',
                        checked: emailForumNotification,
                        onChange: () => this.handleCheckboxChange('emailForumNotification')
                      }),
                      React.createElement(
                        'span', { className: 'switcher-indicator' },
                        React.createElement('span', { className: 'switcher-yes' }), React.createElement('span', { className: 'switcher-no' })
                      ),
                      React.createElement('span', { className: 'switcher-label' }, 'Email me when someone answers on my forum thread')
                    )
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement(
                      'label', { className: 'switcher' },
                      React.createElement('input', {
                        type: 'checkbox',
                        className: 'switcher-input',
                        checked: emailFollowNotification,
                        onChange: () => this.handleCheckboxChange('emailFollowNotification')
                      }),
                      React.createElement(
                        'span', { className: 'switcher-indicator' },
                        React.createElement('span', { className: 'switcher-yes' }), React.createElement('span', { className: 'switcher-no' })
                      ),
                      React.createElement('span', { className: 'switcher-label' }, 'Email me when someone follows me')
                    )
                  ),
                  React.createElement('h6', { className: 'mb-4' }, 'Application'),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement(
                      'label', { className: 'switcher' },
                      React.createElement('input', {
                        type: 'checkbox',
                        className: 'switcher-input',
                        checked: newsAndAnnouncements,
                        onChange: () => this.handleCheckboxChange('newsAndAnnouncements')
                      }),
                      React.createElement(
                        'span', { className: 'switcher-indicator' },
                        React.createElement('span', { className: 'switcher-yes' }), React.createElement('span', { className: 'switcher-no' })
                      ),
                      React.createElement('span', { className: 'switcher-label' }, 'News and announcements')
                    )
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement(
                      'label', { className: 'switcher' },
                      React.createElement('input', {
                        type: 'checkbox',
                        className: 'switcher-input',
                        checked: weeklyProductUpdates,
                        onChange: () => this.handleCheckboxChange('weeklyProductUpdates')
                      }),
                      React.createElement(
                        'span', { className: 'switcher-indicator' },
                        React.createElement('span', { className: 'switcher-yes' }), React.createElement('span', { className: 'switcher-no' })
                      ),
                      React.createElement('span', { className: 'switcher-label' }, 'Weekly product updates')
                    )
                  ),
                  React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement(
                      'label', { className: 'switcher' },
                      React.createElement('input', {
                        type: 'checkbox',
                        className: 'switcher-input',
                        checked: weeklyBlogDigest,
                        onChange: () => this.handleCheckboxChange('weeklyBlogDigest')
                      }),
                      React.createElement(
                        'span', { className: 'switcher-indicator' },
                        React.createElement('span', { className: 'switcher-yes' }), React.createElement('span', { className: 'switcher-no' })
                      ),
                      React.createElement('span', { className: 'switcher-label' }, 'Weekly blog digest')
                    )
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'text-right mt-3' },
        React.createElement('button', { type: 'button', className: 'btn btn-primary' }, 'Save changes')
      )
    );
  };

  render() {
    return React.createElement(
      'div', null,
      this.state.error && React.createElement('p', { className: 'error' }, this.state.error),
      React.createElement(this.AccountSettings)
    );
  }
}
